const request = require('request');
const rp = require('request-promise');
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

            try {


                const jsonBody = JSON.parse(body);
                if (error) console.log(error);

                console.log(response.statusCode);
                console.log('Contacts found : ', jsonBody.length);

                if (jsonBody.length < 1) {
                    console.log('rejecting search promise');
                    reject();
                } else {
                    console.log('resolving search promise');
                    console.log('id', jsonBody[0].id);
                    resolve(jsonBody[0].id);
                }
            }
            catch (e) {
                console.log('No contact found');
                reject();
            }
        });
    });
}

function updateContact(contact, contactID, accountID, groupID, token, res ,req, next){

    console.log("Updating contact with number : " + contact.phoneNumber);

    const options = {
        url: `https://api.cmtelecom.com/addressbook/v2/accounts/${accountID}/contacts/${contactID}`,
        headers: {
                "X-CM-PRODUCTTOKEN": token,
        },
        method: "PUT",
        json: true,
        body: contact
    };

    rp(options)
        .then((parsedBody)=>{
            // Create a response with the request id and url from IFTTT.
            let response;
            if (!req.body.ifttt_source) {
                console.log("No source");
                response = {
                    "data": [
                        {
                            "id": "no id"
                        }
                    ]
                };
            } else {
                if (typeof req.body.ifttt_source.id !== 'undefined' && typeof req.body.ifttt_source.url !== 'undefined') {
                    response = {
                        "data": [
                            {
                                "id": req.body.ifttt_source.id,
                                "url": req.body.ifttt_source.url
                            }
                        ]
                    };
                } else if (typeof req.body.ifttt_source.id !== 'undefined') {
                    response = {
                        "data": [
                            {
                                "id": "no id"
                            }
                        ]
                    };
                }
            }

            // Send the created response.
            res.status(200).send(response);
        })
        .catch((err)=>{
            console.log(err)
            if (token === '0000000-0000-0000-0000-000000000000') {
                console.log("Creating responses for IFTTT");
                // Create a response with the request id and url from IFTTT.
                let response;
                if (!req.body.ifttt_source) {
                    console.log("No source");
                    response = {
                        "data": [
                            {
                                "id": "no id"
                            }
                        ]
                    };
                } else {
                    if (typeof req.body.ifttt_source.id !== 'undefined' && typeof req.body.ifttt_source.url !== 'undefined') {
                        response = {
                            "data": [
                                {
                                    "id": req.body.ifttt_source.id,
                                    "url": req.body.ifttt_source.url
                                }
                            ]
                        };
                    } else if (typeof req.body.ifttt_source.id !== 'undefined') {
                        response = {
                            "data": [
                                {
                                    "id": "no id"
                                }
                            ]
                        };
                    }
                }

                // Send the created response.
                res.status(200).send(response);
            }
            else {
                if (err.error.MessageDetail){
                    const apiError = new ApiError(err.error.MessageDetail, 400);
                    next(apiError)
                }
                else if (err.message){
                    const apiError = new ApiError(err.error.message, 400);
                    next(apiError)
                }
                else {
                    const apiError =  new ApiError("Something went wrong when sending the PUT request to cm.", 400);
                    next(apiError)
                }
            }
        })
}

function createContact(contact, accountID, groupID, token, res, req, next) {

    console.log("Creating contact with number : " + contact.phoneNumber);
    const options = {
        url: `https://api.cmtelecom.com/addressbook/v2/accounts/${accountID}/groups/${groupID}/contacts`,
            headers: {
                "X-CM-PRODUCTTOKEN": token,
            },
            method: "POST",
            json: true,
            body: contact
    };

    rp(options)
        .then((parsedBody)=>{
            // Create a response with the request id and url from IFTTT.
            let response;
            if (!req.body.ifttt_source) {
                console.log("No source");
                response = {
                    "data": [
                        {
                            "id": "no id"
                        }
                    ]
                };
            } else {
                if (typeof req.body.ifttt_source.id !== 'undefined' && typeof req.body.ifttt_source.url !== 'undefined') {
                    response = {
                        "data": [
                            {
                                "id": req.body.ifttt_source.id,
                                "url": req.body.ifttt_source.url
                            }
                        ]
                    };
                } else if (typeof req.body.ifttt_source.id !== 'undefined') {
                    response = {
                        "data": [
                            {
                                "id": "no id"
                            }
                        ]
                    };
                }
            }

            // Send the created response.
            res.status(200).send(response);
        })
        .catch((err)=>{
            if (token === '0000000-0000-0000-0000-000000000000') {
                console.log("Creating responses for IFTTT");
                // Create a response with the request id and url from IFTTT.
                let response;
                if (!req.body.ifttt_source) {
                    console.log("No source");
                    response = {
                        "data": [
                            {
                                "id": "no id"
                            }
                        ]
                    };
                } else {
                    if (typeof req.body.ifttt_source.id !== 'undefined' && typeof req.body.ifttt_source.url !== 'undefined') {
                        response = {
                            "data": [
                                {
                                    "id": req.body.ifttt_source.id,
                                    "url": req.body.ifttt_source.url
                                }
                            ]
                        };
                    } else if (typeof req.body.ifttt_source.id !== 'undefined') {
                        response = {
                            "data": [
                                {
                                    "id": "no id"
                                }
                            ]
                        };
                    }
                }

                // Send the created response.
                res.status(200).send(response);
            }
            else {
                if (err.error.MessageDetail){
                    const apiError = new ApiError(err.error.MessageDetail, 400);
                    next(apiError)
                }
                else if (err.message){
                    const apiError = new ApiError(err.error.message, 400);
                    next(apiError)
                }
                else {
                    const apiError =  new ApiError("Something went wrong when sending the PUT request to cm.", 400);
                    next(apiError)
                }
            }
        })

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
                contactIFTTT.phoneNumber,
                accountID,
                token);
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
            updateContact(cmContact, contactID, accountID, groupID, token, res, req, next);

        }).catch((rejectMessage) => {

            // If contact does not exists: CREATE
            createContact(cmContact, accountID, groupID, token, res,req, next);
        });
    }
};