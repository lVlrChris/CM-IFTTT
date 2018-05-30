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
            token: req.body.actionFields.token
        };

        console.log('Content from IFTTT to CM\n', iftttInput);

        // TODO: validate input
        // - Sender and body required
        // - Sender max 11 characters

        let smsObject = null;

        try {
            smsObject = new Sms(iftttInput.sender, iftttInput.receiver, iftttInput.body, iftttInput.token);
        } catch (ApiError) {
            next(ApiError);
            return;
        }

        // TODO: delegate responsibility to other module
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

        // TODO: delegate sending responsibility to manager
        // Send request to CM
        request({
            url: "https://gw.cmtelecom.com/v1.0/message",
            method: "POST",
            json: true,
            body: cmSMS
        }, function (error, response, body){
            if (error) console.log(error);
            else console.log(body);
        });
        // Return response


        const response = {'message': 'SMS Send'};
        res.status(200).send(response);



    },
};