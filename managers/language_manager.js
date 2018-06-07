const request = require('request');
const Sms = require('../domain/Sms');
const ApiError = require('../domain/ApiError');
const languages = require('../data/languages');

function makeIftttResponse(body){
    let correctResponse = [];
    for (let i = 0; i<body.size;i++){
        correctResponse.push(body[i])
    }
    let dataResponse = {
        data : [
            JSON.parse(body)
        ]
    };
    console.log(dataResponse);
    return dataResponse;
}

module.exports = {
    getLanguages(req, res, next) {

        // let response;
        // if (!req.body.ifttt_source) {
        //     console.log("No source");
        //     response = {
        //         "data": [
        //             {
        //                 "id": "no id"
        //             }
        //         ]
        //     };
        // } else {
        //     if (typeof req.body.ifttt_source.id !== 'undefined' && typeof req.body.ifttt_source.url !== 'undefined') {
        //         response = {
        //             "data": [
        //                 {
        //                     "id": req.body.ifttt_source.id,
        //                     "url": req.body.ifttt_source.url
        //                 }
        //             ]
        //         };
        //     } else if (typeof req.body.ifttt_source.id !== 'undefined') {
        //         response = {
        //             "data": [
        //                 {
        //                     "id": "no id"
        //                 }
        //             ]
        //         };
        //     } else {
        //         response = languages;
        //     }
        // }

        let response;



        try {
            console.log(languages);
            res.status(200).send(languages);
        }catch (e) {
            res.status(500).send({error : "could not find languages"})
        }

        // const productToken = req.header('X-CM-PRODUCTTOKEN');
        // request({
        //     url: "https://api.cmtelecom.com/voicesendapi/v1.0/tts/languages",
        //     method: "get",
        //     headers: {
        //         'X-CM-PRODUCTTOKEN': '139755f7-d92a-4d6b-8105-fd82de35104b'
        //     }
        // }, function (error, response, body){
        //     console.log(body)
        //     if (error) {
        //         console.log('error' + error)
        //     }
        //     else {
        //         let correctRes = makeIftttResponse(body);
        //         console.log('body' + body);
        //         res.status(200).send(correctRes);
        //     }
        // });
    }
};
