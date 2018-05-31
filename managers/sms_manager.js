const request = require('request');
const Sms = require('../domain/Sms');

// TODO: create all responses
module.exports = {
    sendSms(req, res, next) {

        // Get input from ifttt
        const iftttInput = {
            sender: req.body.actionFields.sender,
            body: req.body.actionFields.body,
            receiver: req.body.actionFields.receiver,
            token: req.body.actionFields.token,
            id: req.body.ifttt_source.id,
            url: req.body.ifttt_source.url
        };

        let smsObject = null;
        // Validate input
        try {
            smsObject = new Sms(iftttInput.sender, iftttInput.receiver, iftttInput.body, iftttInput.token);
        } catch (ApiError) {
            next(ApiError);
            return;
        }

        // convert ifttt input to CM SMS
        const cmSMS = {
            messages: {
                authentication: {
                    producttoken: smsObject.token
                },
                msg: [{
                    from: smsObject.sender,
                    to: [{
                        number: smsObject.receiver
                    }],
                    body: {
                        content: smsObject.body
                    }
                }]
            }
        };

        // Send post request to CM (sending sms)
        request({
            url: "https://gw.cmtelecom.com/v1.0/message",
            method: "POST",
            json: true,
            body: cmSMS
        }, function (error, response, body){
            if (error) console.log(error);
            else console.log(body);
        });

        // Create a response with the request id and url from IFTTT.

        let response = null;
        if (typeof iftttInput.id !== 'undefined' && typeof iftttInput.url !== 'undefined') {
            response = {
                "data": [
                    {
                        "id": iftttInput.id,
                        "url": iftttInput.url
                    }
                ]
            };
        } else if (typeof iftttInput.id !== 'undefined') {
            response = {
                "data": [
                    {
                        "id": "no id"
                    }
                ]
            };
        } else if (typeof iftttInput.id === 'undefined' && typeof iftttInput.url === 'undefined') {
            // TODO: Make this work with IFTTT Tests
            response = {
                "data": [
                    {
                        "id": "no id",
                        "url": "no url"
                    }
                ]
            };
        }

        // Send the created response.
        res.status(200).send(response);

    },
};