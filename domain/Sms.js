const joi = require('joi');
const ApiError = require('../domain/ApiError');

class Sms{
    constructor(sender, receiver, body, token) {
        //Try to make a sms object
        try {
            //Checks if the sms is valid, according to the joi schema
            const { error } =   validate(sender, receiver, body, token);

            //If an error is found, throw the error and jump into catch
            if (error) throw error;

            //If no error is found, assign the values to the correct variables
            this.sender = sender;
            this.receiver = receiver;
            this.body = body;
            this.token = token;
        }catch (e) {
            //TODO: The catch should make a new error and should be thrown to the route to stop the procces
            throw (new ApiError(e.details[0].message, 412));
        }

    }
}

//Validate function for a sms object
function validate(sender, receiver, body, token) {
    //Sms object, used for checking if the object matches the schema

    const alphanumericReg = new RegExp('^[a-zA-Z0-9_]*$');
    const digitReg = new RegExp('^[0-9]+$');

    const smsObject = {
        sender : sender,
        receiver: receiver,
        body: body,
        token: token
    };
    
    if (digitReg.test(sender)){
        console.log('The sender is a number');
    } else if (digitReg.test(sender)) {
        console.log('The sender is alphanumeric')
    } else {
        console.log('Type of sender undefined')
    }

    //Schema for a sms, this defines what a sms should look like
    const schema = {
        sender : joi.string().required(),
        receiver: joi.string().required(),
        body: joi.string().max(160).required(),
        token: joi.string().required()
    };

    //Validate sms and return result
    return joi.validate(smsObject,schema);
}
module.exports = Sms;