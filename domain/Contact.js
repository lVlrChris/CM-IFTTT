const joi = require('joi');
const ApiError = require('../domain/ApiError');

class Contact{
    constructor(email, firstName, lastName, insertion, groupId, phoneNumber) {
        try {
            const { error } = validate(email, firstName, lastName, insertion, groupId, phoneNumber);

            if(error) throw error;

            this.email = email;
            this.firstName = firstName;
            this.lastName = lastName;
            this.insertion = insertion;
            this.groupId = groupId;
            this.phoneNumber = phoneNumber;

        } catch (e) {
            throw (new ApiError(e.details[0].message, 400));
        }
    }
}

function validate(email, firstName, lastName, insertion, groupId, phoneNumber){
    //Contact object, used for checking if the object matches the schema
    const contactObject = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        insertion: insertion,
        groupId: groupId,
        phoneNumber: phoneNumber
    };

    //Schema for a contact, this defines what a contact should look like
    const schema = {
        email: joi.string().required(),
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        insertion: joi.string().required(),
        groupId: joi.string().required(),
        phoneNumber: joi.string().required()
    };

    //Validate contact and return result
    return joi.validate(hybridObject,schema);
}
module.exports = Contact;