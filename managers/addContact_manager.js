const request = require('request');
const Contact = require('../domain/Contact');
const ApiError = require('../domain/ApiError');

function searchContact(queryString, accountID, groupID, token) {
    return new Promise((resolve, reject) => {


        // Check if a contact with this phoneNumber exists in the group
        console.log('Making get request to cm.');
        request({
            url: `https://api.cmtelecom.com/addressbook/v2/accounts/${accountID}/groups/${groupID}/search?query=${queryString}`,
            headers: {
                "X-CM-PRODUCTTOKEN": token,
            },
            method: "GET"
        }, (error, response, body) => {

            const jsonBody = JSON.parse(body);
            if (error) console.log(error);

            console.log('Contacts found : ',jsonBody.length);
            if (jsonBody.length < 1){
                console.log('rejecting search promise');
                reject();
            }  else {
                console.log('resolving search promise');
                console.log('id', jsonBody[0].id);
                resolve(jsonBody[0].id);
            }
        });

    });
}

function updateContact(contact, contactID, accountID, groupID, token) {

    // Send put request to CM (updating contact)
    console.log('Starting updating contact');
    request({
        url: `https://api.cmtelecom.com/addressbook/v2/accounts/${accountID}/contacts/${contactID}`,
        headers: {
            "X-CM-PRODUCTTOKEN": token,
        },
        method: "PUT",
        json: true,
        body: contact
    }, (error, response, body) => {


        console.log('Update request finished');
        if (error){
           // console.log(error);
            console.log('error occured while updating')
        } else {
            console.log('status : ' + response.statusCode);
            console.log('body from cm ' + JSON.stringify(body));
            console.log('update succesfull')
        }
    });

}

function createContact(contact, accountID, groupID, token) {

    // Send post request to CM (adding contact)
    console.log('creating new contact')
    request({
        url: `https://api.cmtelecom.com/addressbook/v2/accounts/${accountID}/groups/${groupID}/contacts`,
        headers: {
            "X-CM-PRODUCTTOKEN": token,
        },
        method: "POST",
        json: true,
        body: contact
    }, (error, response, body) => {
        console.log('post request to cm completed')
        if (error) {
            console.log(error);
            console.log('error occured when making contact')
        }else {
            console.log('created succesfully');
            console.log('statuscode : ' + response.statusCode);
            console.log(body)
        }

    });

}

function createResponsesForIFTTT(requestBody) {

    console.log("Creating responses for IFTTT");
    // Create a response with the request id and url from IFTTT.
    let response;
    if (!requestBody.ifttt_source) {
        console.log("No source");
        return {
            "data": [
                {
                    "id": "no id"
                }
            ]
        };
    } else {
        if (typeof requestBody.ifttt_source.id !== 'undefined' && typeof requestBody.ifttt_source.url !== 'undefined') {
            return {
                "data": [
                    {
                        "id": requestBody.ifttt_source.id,
                        "url": requestBody.ifttt_source.url
                    }
                ]
            };
        } else if (typeof requestBody.ifttt_source.id !== 'undefined') {
            return {
                "data": [
                    {
                        "id": "no id"
                    }
                ]
            };
        }
    }

}

module.exports = {
    async addContact(req, res, next) {

        // Get input from IFTTT
        let accountID = null;
        let groupID = null;
        let token = null;
        let contactIFTTT = {
            email: null,
            firstName: null,
            lastName: null,
            insertion: null,
            phoneNumber: null
        };

        // Check if actionFields exists
        if (typeof req.body.actionFields !== 'undefined') {

            accountID = req.body.actionFields.accountID || "";
            groupID = req.body.actionFields.groupID || "";
            token = req.body.actionFields.token || "";
            contactIFTTT = {
                email: req.body.actionFields.email || "",
                firstName: req.body.actionFields.firstName|| "",
                lastName: req.body.actionFields.lastName || "",
                insertion: req.body.actionFields.insertion || "",
                phoneNumber: req.body.actionFields.phoneNumber || ""
            };

        } else {
            next(new ApiError('actionFields missing in body.', 400));
            return;
        }

        // Validate input
        let contact = null;
        try {
            contact = new Contact(
                contactIFTTT.email,
                contactIFTTT.firstName,
                contactIFTTT.lastName,
                contactIFTTT.insertion,
                groupID,
                contactIFTTT.phoneNumber);
        } catch (apiError) {
            next(apiError);
            return;
        }

        // Converting to CM format
        const cmContact = {
            email: contact.email,
            firstName: contact.firstName,
            lastName: contact.lastName,
            insertion: contact.insertion,
            groupID: contact.groupId,
            phoneNumber: contact.phoneNumber
        };

        // Look contact
        searchContact(cmContact.phoneNumber, accountID, groupID, token).then((contactID) => {

            // If contact does exist: UPDATE
            updateContact(cmContact, contactID, accountID, groupID, token);

        }).catch((rejectMessage) => {

            // If contact does not exists: CREATE
            createContact(cmContact, accountID, groupID, token);

        });


        // Get response for IFTTT
        let response = createResponsesForIFTTT(req.body);

        // Send the created response.
        res.status(200).send(response);

    }
};