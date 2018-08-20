const InboundSms = require("../domain/InboundSms");
const ApiError = require('../domain/ApiError');
const rp = require('request-promise');
const IFTTTFormatter = require('../domain/IFTTTFormatter');

module.exports = {
    getInboundSms(req, res, next) {


        let receiver = null;
        let specifiedSender = null;

        if (typeof req.body.triggerFields !== 'undefined') {

            specifiedSender = req.body.triggerFields.specified_sender || "";
            receiver = req.body.triggerFields.receiver || "";

        } else {
            next(new ApiError('triggerFields key not provided.', 400));
            return;
        }

        let inboundObject = null;

        try {
            inboundObject = new InboundSms(receiver,specifiedSender);
        } catch (apiError) {
            next(apiError);
            return;
        }

        // let fakedata= {
        //     "data": [
        //
        //         {
        //             "receiver": "http://example.com/images/128",
        //             "specified_sender": "banksy, brooklyn",
        //             "posted_at": "2013-11-04T09:23:00-07:00",
        //             "meta": {
        //                 "id": "14b9-1fd2-acaa-5df5",
        //                 "timestamp": 1383597267
        //             }
        //         },
        //         {
        //
        //             "receiver": "http://example.com/images/128",
        //             "specified_sender": "banksy, brooklyn",
        //             "posted_at": "2013-11-04T09:23:00-07:00",
        //             "meta": {
        //                 "id": "14b9-1fd2-acaa-5df5",
        //                 "timestamp": 1383597267
        //             }
        //         },
        //         {
        //             "receiver": "http://example.com/images/128",
        //             "specified_sender": "banksy, brooklyn",
        //             "posted_at": "2013-11-04T09:23:00-07:00",
        //             "meta": {
        //                 "id": "14b9-1fd2-acaa-5df5",
        //                 "timestamp": 1383597267
        //             }
        //         },
        //         {
        //
        //             "receiver": "http://example.com/images/128",
        //             "specified_sender": "banksy, brooklyn",
        //             "posted_at": "2013-11-04T09:23:00-07:00",
        //             "meta": {
        //                 "id": "14b9-1fd2-acaa-5df5",
        //                 "timestamp": 1383597267
        //             }
        //         },
        //         {
        //             "receiver": "http://example.com/images/128",
        //             "specified_sender": "banksy, brooklyn",
        //             "posted_at": "2013-11-04T09:23:00-07:00",
        //             "meta": {
        //                 "id": "14b9-1fd2-acaa-5df5",
        //                 "timestamp": 1383597267
        //             }
        //         },
        //         {
        //
        //             "receiver": "http://example.com/images/128",
        //             "specified_sender": "banksy, brooklyn",
        //             "posted_at": "2013-11-04T09:23:00-07:00",
        //             "meta": {
        //                 "id": "14b9-1fd2-acaa-5df5",
        //                 "timestamp": 1383597267
        //             }
        //         }
        //     ]
        // };

        let fakeData = {
            data : [

              ]
        };

        for (let i = 0; i < 50; i++) {
            fakeData.data.push({
                "trigger_identity": "2cb79d6fca9b72d459f66bc733ae6f1a08ca03f0",
                            "receiver": "http://example.com/images/128",
                            "specified_sender": "banksy, brooklyn",
                            "created_at": "2013-11-04T09:23:00-07:00",
                            "meta": {
                                "id": i.toString(),
                                "timestamp": 1383597267
                            }
                        })
        }

        console.log("fakedatalength = " + fakeData.data.length);

        let limit = req.body.limit;


        if (limit === undefined){
            limit = 50;
        }
        let response = {
            data : [

            ]
        };

        console.log("limit is " +  limit);
        for (let i = 0; i < limit; i++) {
            if (fakeData.data.length > i){
                response.data.push(fakeData.data[i])
            }
        }

        console.log("response length is " + response.data.length);
        res.status(200).send(response);
    }
};