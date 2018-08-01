const joi = require('joi');
const ApiError = require('../domain/ApiError');

class Contact{
    constructor(email, firstName, lastName, insertion, groupId, phoneNumber, accountId, token) {
        try {
            const { error } = validate(email, firstName, lastName, insertion, groupId, phoneNumber, accountId,token);

            if(error) throw error;

            this.email = email;
            this.firstName = firstName;
            this.lastName = lastName;
            this.insertion = insertion;
            this.groupId = groupId;
            this.phoneNumber = phoneNumber;
            this.accountId = accountId;
            this.token = token;
        } catch (e) {
            //console.log(e);
            throw (new ApiError(e.details[0].message, 400));
        }
    }
}

function validate(email, firstName, lastName, insertion, groupId, phoneNumber, accountId, token){
    //Contact object, used for checking if the object matches the schema
    const contactObject = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        insertion: insertion,
        groupId: groupId,
        phoneNumber: phoneNumber,
        accountId: accountId,
        token: token
    };

    //Schema for a contact, this defines what a contact should look like
    const schema = {
        email: joi.string().required(),
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        insertion: joi.string().allow(''),
        groupId: joi.string().required(),
        phoneNumber: joi.string().required(),
        accountId: joi.string().required(),
        token: joi.string().required()
    };
    //Validate contact and return result
    return joi.validate(contactObject, schema);
}
module.exports = Contact;