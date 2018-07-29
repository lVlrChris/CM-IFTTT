//All the languages from data/languages
const request = require('request');

module.exports = {
    //Method that executes when the endpoint is being used
    getLanguages(req, res, next) {
        //Get language list from CM endpoint
        const cmResponse = new Promise(
            function (resolve, reject) {
                request({
                    url: "https://api.cmtelecom.com/voicesendapi/v1.0/tts/languages",
                    method: "GET",
                    json: true
                }, function (error, response, body) {
                    if (error) {
                        console.log(error);
                    } else {
                        resolve(body);
                    }
                });
            }
        ).then(function (result) {
            //Format list for IFTTT

            let languages = {data: []};

            const resultSize = Object.keys(result).length;

            for (let i = 0; i < resultSize; i++) {
                const key = Object.keys(result)[i];
                const value = result[key];

                const langObject = {value: key, label: value};

                languages.data.push(langObject);
            }

            console.log(languages);

            //Respond with the language list

            if (languages.data.size <= 0) {
                res.status(400).send({error: "Could not find languages"});
            } else {
                res.status(200).send(languages);
            }

        });

    }
};
