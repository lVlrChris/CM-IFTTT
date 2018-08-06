const request = require('request');
const Hybrid = require('../domain/Hybrid');
const ApiError = require('../domain/ApiError');
const config = require('../config/config');
const rp = require('request-promise');

module.exports = {
    sendHybrid(req, res, next) {

        let sender = null;
        let receiver = null;
        let body = null;
        let token = null;
        let appKey = null;

        // Get input from ifttt
        // Check if actionFields exists
        if (typeof req.body.actionFields !== 'undefined') {

            sender = req.body.actionFields.sender || "";
            receiver = req.body.actionFields.receiver || "";
            body = req.body.actionFields.body || "";
            token = req.body.actionFields.token || "";
            appKey = req.body.actionFields.appKey || config.notifireAppkey;

        } else {
            next(new ApiError('actionFields missing in body.', 400));
            return;
        }

        // Validate input
        let hybridObject = null;

        try {
            hybridObject = new Hybrid(sender, receiver, body, token, appKey);
        } catch (apiError) {
            next(apiError);
            return;
        }

        // convert ifttt input to CM HYBRID
        const receiversIFTTT = hybridObject.receiver.split(', ');
        const receiversCM = [];
        let i;
        for (i = 0; i < receiversIFTTT.length; i++) {
            receiversCM.push({
                number: receiversIFTTT[i]
            });
        }
        
        //
        console.log('Receivers of the message\n', receiversCM);
     //   console.log(hybridObject.body);
        const cmHYBRID = {
            messages: {
                authentication: {
                    producttoken: hybridObject.token
                },
                msg: [ {
                    from: hybridObject.sender,
                    to: [{
                        number: hybridObject.receiver
                    }],
                    customGrouping3: "IFTTT",
                    minimumNumberOfMessageParts: 1,
                    maximumNumberOfMessageParts: 8,
                    body: {
                        type: "AUTO",
                        content: hybridObject.body
                    },
                    appmessagetype: "critical",
                    appKey: hybridObject.appKey
                }
                ]
            }
        };
        
        //Send post request to CM
        console.log(JSON.stringify(cmHYBRID));
        console.log("Sending post request to CM");
        // Send post request to CM (sending sms)
        // request({
        //     url: "https://gw.cmtelecom.com/v1.0/message",
        //     method: "POST",
        //     json: true,
        //     body: cmHYBRID
        // }, function (error, response, body){
        //     if (error) console.log(error);
        //     else console.log(body);
        // });

        const options = {
            url: "https://gw.cmtelecom.com/v1.0/message",
            method: "POST",
            json: true,
            body: cmHYBRID
        };

        rp(options)
            .then((parsedBody)=>{

                //Create response for IFTTT
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
            })

            //TODO: Een generieke token nodig om door de auth van cm te komen
            .catch((err)=>{
                if (hybridObject.token === '0000000-0000-0000-0000-000000000000'){
                    //Create response for IFTTT
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