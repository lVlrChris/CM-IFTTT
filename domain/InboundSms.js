const joi = require('joi');
const ApiError = require('../domain/ApiError');
class InboundSms {

    constructor(receiver){

        const { error } = validate(receiver);
        if(error) throw error;

        this.receiver = receiver;
    }catch (e) {
        throw (new ApiError(e.details[0].message, 400));
    }



}

//Validate function for a voice object
function validate(receiver){
    //Voice object, used for checking if the object matches the schema
    const inboundObject = {
        receiver: receiver,
    };

    const schema = {
        receiver: joi.string().required(),
    };

    //Validate voice message and return result
    return joi.validate(inboundObject,schema);
}

module.exports = InboundSms;