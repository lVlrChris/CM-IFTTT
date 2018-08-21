const joi = require('joi');
const ApiError = require('../domain/ApiError');
class InboundSms {

    constructor(receiver,specifiedSender){

        try {
            const {error} = validate(receiver,specifiedSender);
            if (error) throw error;

            this.receiver = receiver;
            this.specifiedSender = specifiedSender
        }catch (e) {
            throw (new ApiError(e.details[0].message, 400));
        }
    }



}

//Validate function for a InboundSms object
function validate(receiver,specifiedSender){
    //Voice object, used for specifiedSenderchecking if the object matches the schema
    const inboundObject = {
        receiver: receiver,
        specifiedSender: specifiedSender
    };

    const schema = {
        receiver: joi.string().required(),
        specifiedSender: joi.string().optional()
    };

    //Validate voice message and return result
    return joi.validate(inboundObject,schema);
}

module.exports = InboundSms;