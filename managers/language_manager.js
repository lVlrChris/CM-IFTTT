//All the languages from data/languages
const languages = require('../data/languages');

module.exports = {
    //Method that executes when the endpoint is being used
    getLanguages(req, res, next) {
        //Checks if languages are not null or undefined
        if (languages !== undefined && languages !== null){
            res.status(200).send(languages)
        }else {
            res.status(400).send({error : "could not find languages"})
        }
    }
};
