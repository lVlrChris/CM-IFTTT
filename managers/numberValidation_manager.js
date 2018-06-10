const request = require('request');
const CMNumber = require('../domain/CMNumber');
const ApiError = require('../domain/ApiError');

module.exports = {
    sendValidation(req, res, next) {

        let phoneNumber = null;
        let phoneToken = null;


        if(typeof req.body.actionFields !== 'undefined'){
            phoneNumber = req.body.actionFields.phoneNumber || '';
            phoneToken = req.body.actionFields.phoneToken || '';
        }else {
            next(new ApiError('actionFields missing in body.', 400));
            return;
        }

        console.log('phoneNumber: ' + phoneNumber);
        console.log('phoneToken: '+ phoneToken);

        let numberObject = null;

        try {
            numberObject = new CMNumber(phoneNumber,phoneToken);
        } catch (apiError) {
            next(apiError);
            return;
        }

        console.log("Sending get request to CM");
        // Send GET request to CM (Validating phone number)

        let response;

        request({
            url: "https://api.cmtelecom.com/v1.1/numbervalidation/" +numberObject.phoneNumber,
            headers:  {
                "X-CM-PRODUCTTOKEN" : phoneToken,
            },
            method: "GET",
            json: true,
        }, function (error, response, body){
            if (error) console.log(error);
            else {
                console.log(body);
                console.log(body.valid_number);
                if(body.valid_number){
                    response = {
                        'phoneNumber': numberObject.phoneNumber,
                        'phoneToken': numberObject.phoneToken,
                        'isValid': body.valid_number
                    };
                    res.status(200).send(response);
                }
                else{
                    response = {
                        'phoneNumber': numberObject.phoneNumber,
                        'phoneToken': numberObject.phoneToken,
                        'isValid': 'false'
                    };
                    res.status(420).send(response);
                    //ToDO: better response
                }
            };
        });


        //ToDo: iFTTT response
        // console.log("Creating responses for IFTTT");
        // Create a response with the request id and url from IFTTT.

        // Send the created response.

    }
};