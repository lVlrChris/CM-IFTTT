const joi = require('joi');
const ApiError = require('../domain/ApiError');

//TODO: Allow whitespaces and specials chars like ?!. in a sender
class Sms{
    constructor(sender, receiver, body, token) {
        //Try to make a sms object
        try {
            //The correct sender, checks if sender is valid
            let correctedSender;
            if (sender !== undefined) {
                correctedSender = correctSender(sender);
                console.log('The corrected sender is ' + correctedSender );
            }else {console.log('The sender is undefined')}

            //Checks if the sms is valid, according to the joi schema
            const { error } =   validate(correctedSender, receiver, body, token);

            //If an error is found, throw the error and jump into catch
            if (error) throw error;

            //If no error is found, assign the values to the correct variables
            this.sender = correctedSender;
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
    const smsObject = {
        sender : sender,
        receiver: receiver,
        body: body,
        token: token
    };

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

function correctSender(sender){
    if (sender !== parseInt(sender)) {
        const alphanumericReg = new RegExp('^[a-zA-Z0-9-_!?\\.,@# ]*$');
        const digitReg = new RegExp('^[0-9]+$');
        if (digitReg.test(sender)) {
            console.log('The sender is using digits');
            return sender.substring(0, 16);
        } else if (alphanumericReg.test(sender)) {
            console.log('The sender is using alphanumeric');
            return sender.substring(0, 11);
        } else {
            console.log('Type of sender undefined')
        }
    }else {
        return sender
    }
}

module.exports = Sms;