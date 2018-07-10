//All the languages from data/languages
const languages = require('../data/languages');
const request = require('request');

module.exports = {
    //Method that executes when the endpoint is being used
    getLanguages(req, res, next) {
        // //Checks if languages are not null or undefined
        // if (languages !== undefined && languages !== null){
        //     res.status(200).send(languages)
        // }else {
        //     res.status(400).send({error : "could not find languages"})
        // }

        //Get language list from CM endpoint
        let cmResponse;

        request({
            url: "https://api.cmtelecom.com/voicesendapi/v1.0/tts/languages",
            method: "POST",
            json: true
        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                cmResponse = body;
            }
        });

        let languages = {data: []};

        for (let i = 0; i < cmResponse.size; i++) {
            const key = Object.keys(cmResponse[i]);
            const value = cmResponse[i];

            const langObject = {value: key, label: value};

            langObject.data.push(langObject);
        }

        console.log(languages);

    }
};
