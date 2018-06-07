const joi = require('joi');
const ApiError = require('../domain/ApiError');

//Constructor
class Voice{
    constructor(username, key, sender, receiver, body, language, token) {
        try {
            if (receiver === undefined) {
                console.log('The receiver is undefined!');
            }else if(sender === undefined){
                console.log('The sender is undefined!');
            }

            const { error } = validate(username, key, sender, receiver, body, language, token);

            if(error) throw error;

            this.username = username;
            this.key = key;

            this.sender = sender;
            this.receiver = receiver;
            this.body = body;
            this.language = language;
            this.token = token;

        } catch (e) {
            throw (new ApiError(e.details[0].message, 400));
        }

    }

}

//Validate function for a voice object
function validate(username, key, sender, receiver, body, language, token){
    //Voice object, used for checking if the object matches the schema
    const voiceObject = {
        username: username,
        key: key,
        sender: sender,
        receiver: receiver,
        body: body,
        language: language,
        token: token
    };

    //Schema for a voice message, this defines what a voice message should look like
    const schema = {
        username: joi.string().required(),
        key: joi.string().required(),
        sender: joi.string().required(),
        receiver: joi.string().required(),
        body: joi.string().max(160).required(),
        language: joi.string().required(),
        token: joi.string().required()
    };

    //Validate voice message and return result
    return joi.validate(voiceObject,schema);
}








