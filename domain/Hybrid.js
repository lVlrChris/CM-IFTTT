const joi = require('joi');
const ApiError = require('../domain/ApiError');
const ValidateNumber = require('../managers/numberValidation_manager');

class Hybrid{
    constructor(sender, receiver, body, token, appKey) {
        //Trying to make a hybrid object
        try {
            let correctedSender;
            //This if statement prevents a undefined error, otherwise the correctSender method will be called on a undefined
            if (sender !== undefined) {
                //This methods returns the corrected sender
                correctedSender = correctSender(sender);
                //Logs the sender after it has been corrected to the CM standards
                console.log('The corrected sender is ' + correctedSender );
            }else {console.log('The sender is undefined')}

            //Checks if the hybrid message is valid, according to the joi schema
            const { error } = validate(correctedSender, receiver, body, token, appKey);

            //If an error is found, throw the error and jump into catch
            if (error) throw error;

            //Checks if number is valid or not
            if(!ValidateNumber.checkNumber(receiver, token)){
                throw new ApiError('Invalid number!', 400);
            }

            //If no error is found, assign the values to the correct variables
            this.sender = correctedSender;
            this.receiver = receiver;
            this.body = body;
            this.token = token;
            this.appKey = appKey;
        }catch (e) {
            //Throws a new ApiError with the details of a joi error.
            throw (new ApiError(e.details[0].message, 400));
        }

    }
}

function validate(sender, receiver, body, token, appKey){
    //Hybrid object, used for checking if the object matches the schema
    const hybridObject = {
        sender: sender,
        receiver: receiver,
        body: body,
        token: token,
        appKey: appKey
    };

    //Schema for a hybrid message, this defines what a hybrid message should look like
    const schema = {
        sender: joi.string().required(),
        receiver: joi.string().required(),
        body: joi.string().max(160).required(),
        token: joi.string().required(),
        appKey: joi.string().required()
    };

    //Validate hybrid message and return result
    return joi.validate(hybridObject,schema);
}

//Function to correct a sender to the CM standards
function correctSender(sender){
    //Checks if the sender is an int, if so return the sender.
    if (sender !== parseInt(sender)) {

        //Regular expression to check if a sender is using alphanumeric chars
        const alphanumericReg = new RegExp('^[a-zA-Z0-9-_!?\\.,@# ]*$');

        //Regular expression to check if a sender is using only digits
        const digitReg = new RegExp('^[0-9]+$');

        //Tests if the sender is using digits
        if (digitReg.test(sender)) {
            console.log('The sender is using digits');
            //Returns the first 16 chars of the sender, this is requested by CM
            return sender.substring(0, 16);
        }
        //Tests if the sender is using alphanumeric values
        else if (alphanumericReg.test(sender)) {
            console.log('The sender is using alphanumeric');
            //Returns the first 11 chars of the sender, this is requested by CM
            return sender.substring(0, 11);
        } else {
            //If the sender is not made of digits or alphanumeric chars, the sender will be undefined.
            //This prevents special chars to be sent to the CM api
            console.log('Type of sender undefined');
            return 'undefinedSender';
        }
    }else {
        //If the sender is an int, or any other type of value, the sender will not be adjusted.
        //Since the joi package will detect its not a string
        return sender;
    }
}
module.exports = Hybrid;