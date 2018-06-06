const joi = require('joi');
const ApiError = require('../domain/ApiError');

//Validate function for a voice object
function validate(receiver, sender, body, language, token){
    //Voice object, used for checking if the object matches the schema
    const voiceObject = {
        receiver: receiver,
        sender: sender,
        body: body,
        language: language,
        token: token
    };

    //Schema for a voice message, this defines what a voice message should look like
    const schema = {
        receiver: joi.string().required(),
        sender: joi.string().required(),
        body: joi.string().max(160).required(),
        language: joi.string().required(),
        token: joi.string().required()
    };

    //Validate voice message and return result
    return joi.validate(voiceObject,schema);
}








