const request = require('request');

module.exports = {
    //Method checks if number is valid and uses promise to wait on result
    checkNumber(number, token) {
        return new Promise((resolve) => {
            //Request to validation api from cm
            request({
                url: "https://api.cmtelecom.com/v1.1/numbervalidation/" + number,
                headers: {
                    "X-CM-PRODUCTTOKEN": token,
                },
                method: "GET",
                json: true,
            }, function (error, response, body) {
                if (error) console.log(error);
                //If number is valid return true, else false
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