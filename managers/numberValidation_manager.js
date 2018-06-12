const request = require('request');
const CMNumber = require('../domain/CMNumber');
const ApiError = require('../domain/ApiError');

//ToDo: Make function
module.exports = {
    checkNumber(number, token) {
        return new Promise((resolve) => {
            request({
                url: "https://api.cmtelecom.com/v1.1/numbervalidation/" + number,
                headers: {
                    "X-CM-PRODUCTTOKEN": token,
                },
                method: "GET",
                json: true,
            }, function (error, response, body) {
                if (error) console.log(error);
                else {
                    if (body.valid_number) {
                        console.log(number + ' is a valid number!');
                        resolve(true);
                    }
                    else {
                        console.log(number + ' is an invalid number!');
                        resolve(false);
                    }
                }
            });
        });
    }
};