const request = require('request');
const rp = require('request-promise');
const Sms = require('../domain/Sms');
const ApiError = require('../domain/ApiError');
const IFTTTFormatter = require('../domain/IFTTTFormatter');

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
            smsObject = new Sms(sender, receiver, body, token);
        } catch (apiError) {
            next(apiError);
            return
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
                    minimumNumberOfMessageParts: 1,
                    maximumNumberOfMessageParts: 8,
                    body: {
                        type: "AUTO",
                        content: smsObject.body
                    }
                }]
            }
        };

        console.log("Sending post request to CM");

        const options = {
            url: "https://gw.cmtelecom.com/v1.0/message",
            method: "POST",
            json: true,
            body: cmSMS
        };

        rp(options)
            .then((parsedBody)=>{
             //   console.log(parsedBody)
                console.log("Creating responses for IFTTT");
                // Create a response with the request id and url from IFTTT.
                const formatter = new IFTTTFormatter(req.body.ifttt_source, req.body.ifttt_source.id, req.body.ifttt_source.url);
                let response = formatter.iftttResponse();

                // Send the created response.
                res.status(200).send(response);
            })
            .catch((err)=>{
                //TODO: Een generieke token nodig om door de auth van cm te komen
                if (smsObject.token === '0000000-0000-0000-0000-000000000000'){
                    console.log("Creating responses for IFTTT");
                    // Create a response with the request id and url from IFTTT.
                    const formatter = new IFTTTFormatter(req.body.ifttt_source, req.body.ifttt_source.id, req.body.ifttt_source.url);
                    let response = formatter.iftttResponse();

                    // Send the created response.
                    res.status(200).send(response);
                }
                else {
                    if (err.error.details && err.statusCode){
                        const apiError = new ApiError(err.error.details, 400);
                        next(apiError)
                    }
                    else {
                        const apiError = new ApiError("Something went wrong when sending the POST request to cm.", 400);
                        next(apiError)
                    }
                }
            });


    }
};