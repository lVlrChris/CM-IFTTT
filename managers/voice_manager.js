const request = require('request');
const Voice = require("../domain/Voice");
const ApiError = require('../domain/ApiError');

module.exports = {
    sendVoice(req, res, next) {



        let sender = null;
        let receiver = null;
        let body = null;
        let language = null;
        let token = null;

        // Get input from ifttt
        // Check if actionFields exists
        if (typeof req.body.actionFields !== 'undefined') {


            sender = req.body.actionFields.sender || "";
            receiver = req.body.actionFields.receiver || "";
            body = req.body.actionFields.body || "";
            language = req.body.actionFields.language || "";
            token  = req.body.actionFields.token || "";

        } else {
            next(new ApiError('actionFields missing in body.', 400));
            return;
        }

        // Validate input
        let voiceObject = null;

        try {
            voiceObject = new Voice(sender, receiver, body, language, token);
        } catch (apiError) {
            next(apiError);
            return;
        }

        // convert ifttt input to CM VOICE
        const receiversIFTTT = voiceObject.receiver.split(', ');
        const receiversCM = [];
        let i;
        for (i = 0; i < receiversIFTTT.length; i++) {
            receiversCM.push({
                number: receiversIFTTT[i]
            });
        }
        console.log('Receivers of the message\n', receiversCM);
        console.log(voiceObject.body);
        const cmVOICE = {
            "callee": voiceObject.receiver,
            "caller": voiceObject.sender,
            "anonymous": "false",
            "prompt": voiceObject.body,
            "prompt-type": "TTS",
            "voice": {
                "language": voiceObject.language,
                "gender": "Female",
                "number": 1
            }
        };

        console.log(cmVOICE);
        console.log("Sending post request to CM");
        // Send post request to CM (sending sms)
        request({
            url: "https://voiceapi.cmtelecom.com/v2.0/Notification",
            headers:  {
                "X-CM-PRODUCTTOKEN" : voiceObject.token,

            },
            method: "POST",
            json: true,
            body: cmVOICE
        }, function (error, response, body){
            console.log('response status : ' + response.statusCode);
            if (error) console.log('error : ' + error);
            else console.log('response : ' +  body);
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