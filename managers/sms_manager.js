const request = require('request');
const Sms = require('../domain/sms');

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

        try {
            const testSmsObject = new Sms(123, 'Klaas', 'hoi', 'asdf', () => {
            });
        } catch (ApiError) {
            next(ApiError);
        }

        // TODO: delegate responsibility to other module
        // convert ifttt input to CM SMS
        const cmSMS = {
            messages: {
                authentication: {
                    producttoken: iftttInput.token
                },
                msg: [{
                    from: iftttInput.sender,
                    to: [{
                        number: iftttInput.receiver
                    }],
                    body: {
                        content: iftttInput.body
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
        res.status(200).send('SMS send');

    },
};