const request = require('request');
const Sms = require('../domain/Sms');
const ApiError = require('../domain/ApiError');
const validateNumber = require('../managers/numberValidation_manager');

// TODO: create all responses
module.exports = {
    sendSms(req, res, next) {

        let sender = null;
        let body = null;
        let receiver = null;
        let token = null;

        // Get input from ifttt
        // Check if actionFields exists
        if (typeof req.body.actionFields !== 'undefined') {

            sender = req.body.actionFields.sender || "";
            body = req.body.actionFields.body || "";
            receiver = req.body.actionFields.receiver || "";
            token  = req.body.actionFields.token || "";

        } else {
            next(new ApiError('actionFields missing in body.', 400));
            return;
        }

        // Validate input
        let smsObject = null;

        try {
            if(validateNumber.checkNumber(receiver, token)) {
                smsObject = new Sms(sender, receiver, body, token);
            } else{
                throw new ApiError('Receiver is not valid!', 400);
            }
        } catch (apiError) {
            next(apiError);
            return;
        }

        // convert ifttt input to CM SMS
        const receiversIFTTT = smsObject.receiver.split(', ');
        const receiversCM = [];
        let i;
        for (i = 0; i < receiversIFTTT.length; i++) {
            receiversCM.push({
                number: receiversIFTTT[i]
            });
        }
        console.log('Receivers of the message\n', receiversCM);
        const cmSMS = {
            messages: {
                authentication: {
                    producttoken: smsObject.token
                },
                msg: [{
                    from: smsObject.sender,
                    to: receiversCM,
                    customGrouping3: "IFTTT",
                    body: {
                        content: smsObject.body
                    }
                }]
            }
        };

        console.log("Sending post request to CM");
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
};