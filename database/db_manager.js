const db = require('./db_connection');

module.exports = {
    //Create inbound sms entry
    createInboundSms(inboundReplySms) {

        const queryText = `INSERT INTO inbound_reply_sms (replyid, receiver, sender, message, reference, productkey) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING inbound_reply_sms.id`;
        const values = [inboundReplySms.replyId,
        inboundReplySms.receiver,
        inboundReplySms.sender,
        inboundReplySms.message,
        inboundReplySms.reference,
        inboundReplySms.productKey];

        db.query(queryText, values, (err, res) => {
            if(err) {
                console.log(err.stack);
            } else {
                console.log(res.rows);
            }
        });
    },

    //Get all inbound sms entries (from a certain user account)
    getInboundSms() {

    },

    //Get inbound sms entries from a specified sender (from a certain user account)
    getInboundSms(sender) {

    }
};