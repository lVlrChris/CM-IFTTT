const joi = require('joi');
const ApiError = require('../domain/ApiError');

class Sms{
    constructor(sender, reciever, body, token){
        //Try to make a sms object
        try {
            //Checks if the sms is valid, according to the joi schema
            const { error } =   validate(sender, reciever, body, token);

            //If an error is found, throw the error and jump into catch
            if (error) throw error;

            //If no error is found, assign the values to the correct variables
            this.sender = sender;
            this.receiver = receiver;
            this.body = body;
            this.token = token;
        }catch (e) {
            //TODO: The catch should make a new error and should be thrown to the route to stop the procces
            console.log(e);
            throw (new ApiError(e.details[0].message, 412));
        }

    }
}

//Validate function for a sms object
function validate(sender, reciever, body, token){
    //Sms object, used for checking if the object matches the schema
    const smsObject = {
        sender : sender,
        body: body,
        receiver: receiver,
        token: token
    };

    //Schema for a sms, this defines what a sms should look like
    const schema = {
        sender : joi.string().required(),
        body: joi.string().required(),
        receiver: joi.string().required(),
        token: joi.string().required()
    };

    //Validate sms and return result
    return joi.validate(smsObject,schema);
}
module.exports = Sms;