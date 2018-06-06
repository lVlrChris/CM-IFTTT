const request = require('request');
const Voice = require("../domain/Voice");
const ApiError = require('../domain/ApiError');

module.exports = {
    sendVoice(req, res, next) {

        let sender = null;
        let body = null;
        let receiver = null;
        let language = null;
        let token = null;

        // Get input from ifttt
        // Check if actionFields exists
        if (typeof req.body.actionFields !== 'undefined') {

            sender = req.body.actionFields.sender || "";
            body = req.body.actionFields.body || "";
            receiver = req.body.actionFields.receiver || "";
            language = req.body.actionFields.language || "";
            token  = req.body.actionFields.token || "";

        } else {
            next(new ApiError('actionFields missing in body.', 400));
            return;
        }

        // Validate input
        let VoiceObject = null;

        try {
            VoiceObject = new Voice(sender, receiver, body, language, token);
        } catch (apiError) {
            next(apiError);
            return;
        }

        // Send the created response.
        res.status(200).send(response);
    }
};