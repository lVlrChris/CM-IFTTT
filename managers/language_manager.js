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

        //backup correct data
        // const languages ={
        //     data:[
        //         {
        //             "value":"Danish (Denmark)"
        //         },
        //         {
        //             "value":"Dutch (Netherlands)"
        //         }
        //     ]
        // };
        try {
            console.log(languages);
            res.status(200).send(languages);
        }catch (e) {
            res.status(500).send({error : "could not find languages"})
        }
    }
};
