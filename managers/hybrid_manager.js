const request = require('request');
const Hybrid = require('../domain/Hybrid');
const ApiError = require('../domain/ApiError');

module.exports = {
    sendHybrid(req, res, next) {

        let sender = null;
        let receiver = null;
        let body = null;
        let producttoken = null;
        let appkey = null;

        // Get input from ifttt
        // Check if actionFields exists
        if (typeof req.body.actionFields !== 'undefined') {

            sender = req.body.actionFields.sender || "";
            receiver = req.body.actionFields.receiver || "";
            body = req.body.actionFields.body || "";
            producttoken = req.body.actionFields.username || "";
            appkey = req.body.actionFields.key || "";

        } else {
            next(new ApiError('actionFields missing in body.', 400));
            return;
        }

        // Validate input
        let hybridObject = null;

        try {
            hybridObject = new Hybrid(sender, receiver, body, producttoken, appkey);
        } catch (apiError) {
            next(apiError);
            return;
        }

        // convert ifttt input to CM VOICE
        const receiversIFTTT = hybridObject.receiver.split(', ');
        const receiversCM = [];
        let i;
        for (i = 0; i < receiversIFTTT.length; i++) {
            receiversCM.push({
                number: receiversIFTTT[i]
            });
        }

    }

};