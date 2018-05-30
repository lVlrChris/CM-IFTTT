class ApiError {

    //Creates an API error object with a message, status code and the time of occurance.
    constructor(message, code) {
            this.message = message;
            this.code = code;
            this.datetime = Date();
        }


    // toString() {
    //     return message + '\nStatus code: ' + code + '\nOccured on : ' + datetime;
    // }
}

module.exports = ApiError;