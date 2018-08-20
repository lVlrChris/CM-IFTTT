const InboundSms = require("../domain/InboundSms");
const ApiError = require('../domain/ApiError');
const rp = require('request-promise');
const IFTTTFormatter = require('../domain/IFTTTFormatter');

module.exports = {
    getInboundSms(req, res, next) {


        let receiver = null;
        let specifiedSender = null;

        if (typeof req.body.triggerFields !== 'undefined') {

            specifiedSender = req.body.triggerFields.specified_sender || "";
            receiver = req.body.triggerFields.receiver || "";

        } else {
            next(new ApiError('actionFields key not provided.', 400));
            return;
        }

        let inboundObject = null;

        try {
            inboundObject = new InboundSms(receiver);
        } catch (apiError) {
            next(apiError);
            return;
        }
        res.sendStatus(200);
    }
};