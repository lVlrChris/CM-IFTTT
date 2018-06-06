const joi = require('joi');
const ApiError = require('../domain/ApiError');

//Validate function for a voice object
function validate(callee, caller, anonymous, prompt, promptType, language, gender, number){
    //Voice object, used for checking if the object matches the schema
    const voiceObject = {
        callee : callee,
        caller: caller,
        anonymous: anonymous,
        prompt: prompt,
        promptType: promptType,
        language: language,
        gender: gender,
        number: number
    };

    //Schema for a voice message, this defines what a voice message should look like
    const schema = {
        callee : joi.string().required(),
        caller: joi.string().required(),
        anonymous: joi.string().required(),
        prompt: joi.string().required(),
        promptType: joi.string().required(),
        language: joi.string().required(),
        gender: joi.string().required(),
        number: joi.string().numeric().required()
    };

    //Validate voice message and return result
    return joi.validate(voiceObject,schema);
}








