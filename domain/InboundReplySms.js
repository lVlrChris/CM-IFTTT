const ApiError = require('./ApiError');
const joi = require('joi');

class InboundReplySms {
    constructor(replyId, receiver, sender, message, reference, productKey){
        try {
            const {error} = validate(replyId, receiver, sender, message, reference, productKey);
            if (error) throw error;

            this.replyId = replyId;
            this.receiver = receiver;
            this.sender = sender;
            this.message = message;
            this.reference = reference;
            this.productKey = productKey
        } catch (e) {
            throw (new ApiError(e.details[0].message, 400));
        }
    }
}

//Validator for the InboundReplySms object
function validate(replyId, receiver, sender, message, reference, productKey) {
    //Check object with chema
    const inboundReplySmsObject = {
        replyId: replyId,
        receiver: receiver,
        sender: sender,
        message: message,
        reference: reference,
        productKey: productKey
    };

    const schema = {
        replyId: joi.number().integer().required(),
        receiver: joi.string().required(),
        sender: joi.string().required(),
        message: joi.string().required(),
        reference: joi.string().required(),
        productKey: joi.string().required()
    };

    return joi.validate(inboundReplySmsObject, schema);
}

module.exports = InboundReplySms;