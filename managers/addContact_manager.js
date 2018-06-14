const request = require('request');
const Contact = require('../domain/Contact');
const ApiError = require('../domain/ApiError');

function searchContact(queryString, accountID, groupID) {
    return new Promise((resolve, reject) => {

        // Checking if contact already exists
        request({
            url: `https://api.cmtelecom.com/addressbook/v2/accounts/${accountID}/groups/${groupID}/search?query=${queryString}`,
            method: "GET"
        }, (error, response, body) => {
            if (error) console.log(error);

            console.log("Response: ", response);
            console.log("Body: ", body);

            // Check if a contact is found
            resolve();

            reject();

        });

    });
}

function updateContact(contact, contactID, accountID, groupID) {

    // Send put request to CM (updating contact)
    request({
        url: `https://api.cmtelecom.com/addressbook/v2/accounts/${accountID}/contacts/${contactID}`,
        method: "PUT",
        json: true,
        body: contact
    }, (error, response, body) => {
        if (error) console.log(error);

        else console.log(body);

    });

}

function createContact(contact, accountID, groupID) {

    // Send post request to CM (adding contact)
    request({
        url: `https://api.cmtelecom.com/addressbook/v2/accounts/${accountID}/groups/${groupID}/contacts`,
        method: "POST",
        json: true,
        body: cmContact
    }, (error, response, body) => {
        if (error) console.log(error);

        else console.log(body);

    });

}

function getIFTTTInput(requestBody) {



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
            contactIFTTT = {
                email: req.body.actionFields.email || "",
                firstName: req.body.actionFields.firstName|| "",
                lastName: req.body.actionFields.lastName | "",
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

        let counter = 0;

        // Look contact
        searchContact(cmContact.phoneNumber, accountID, groupID).then((contactID) => {

            // If contact does exist: UPDATE
            updateContact(contact, contactID, accountID, groupID);

        }).catch((rejectMessage) => {

            // If contact does not exists: CREATE
            createContact(contact, accountID, groupID);

        });


        // Get response for IFTTT
        let response = createResponsesForIFTTT(req.body);

        // Send the created response.
        res.status(200).send(response);

    }
};