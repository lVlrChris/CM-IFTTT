const joi = require('joi');
const ApiError = require('../domain/ApiError');

class CMNumber{
    constructor(phoneNumber, phoneToken){
        //Making a Number object
        try{
            if(phoneNumber === undefined){
                console.log('Phone number is undefined!');
            }else if (phoneToken === undefined){
                console.log('Phone token is undefined!');
            }

            const { error } = validate(phoneNumber, phoneToken);
            if(error) throw error;

            this.phoneNumber = phoneNumber;
            this.phoneToken = phoneToken;

        }catch(h){
            throw (new ApiError(h.details[0].message,400));
        }

    }
}

function validate(phoneNumber, phoneToken) {
    //Voice object, used for checking if the object matches the schema
    const numberObject = {
        phoneNumber: phoneNumber,
        phoneToken: phoneToken
    };

    //Schema for a voice message, this defines what a voice message should look like
    const schema = {
        phoneNumber: joi.string().required(),
        phoneToken: joi.string().required()
    };

    //Validate voice message and return result
    return joi.validate(numberObject, schema);
}
module.exports = CMNumber;
