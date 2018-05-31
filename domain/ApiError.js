class ApiError {

    //Creates an API error object with a message, status code and the time of occurance.
    constructor(message, errorCode) {
        this.message = message;
        this.errorCode = errorCode;
        this.datetime = Date();
    }

    //Override toString for clarity.
    toString() {
        return 'Error code: ' + this.errorCode + ' Error message: ' + this.message + ' Time of occurance: ' + this.datetime + '.';
    }

    toJSON() {
        return {
            "errors": [
                {
                    "status": "SKIP",
                    "message": this.message
                }
            ]
        }
    }
}

module.exports = ApiError;