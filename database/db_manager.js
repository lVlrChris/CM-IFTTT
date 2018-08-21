const db = require('./db_connection');

module.exports = {
    //Create inbound sms entry
    createInboundSms(inboundReplySms) {
        db.query('INSERT INTO inbound_reply_sms (replyid, receiver, sender, message, reference, productkey) VALUES (\'$1\')
    },

    //Get all inbound sms entries (from a certain user account)
    getInboundSms() {

    },

    //Get inbound sms entries from a specified sender (from a certain user account)
    getInboundSms(sender) {

    }
};