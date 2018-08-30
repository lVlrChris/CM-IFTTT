const db = require('./db_connection');
const InboundReplySms = require('../domain/InboundReplySms');
const ApiError = require('../domain/ApiError');

module.exports = {
    //Create inbound sms entry
    createInboundSms(inboundReplySms) {
        const queryText = `INSERT INTO inbound_reply_sms (replyid, receiver, sender, message, reference, productkey, datesend) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING inbound_reply_sms.id`;
        const values = [inboundReplySms.replyId,
        inboundReplySms.receiver,
        inboundReplySms.sender,
        inboundReplySms.message,
        inboundReplySms.reference,
        inboundReplySms.productKey,
        inboundReplySms.datesend];

        db.query(queryText, values, (err, res) => {
            if(err) {
                console.log(err.stack);
            } else {
                console.log(res.rows);
            }
        });
    },

    //Get all inbound sms entries (from a certain user account)
    getAllInboundSms(productKey) {
        const queryText = `SELEC * FROM inbound_reply_sms WHERE inbound_reply_sms.productkey = $1 ORDER BY inbound_reply_sms.datesend DESC LIMIT 50`;
        const values = [productKey];

        return new Promise((resolve, reject) => {

            db.query(queryText, values, (err, res) => {
                if (err) {
                    reject(new ApiError(err.message, 500));
                } else {
                    let results = [];

                    //Loop through results and create objects for every row.
                    for (let i = 0; i < res.rows.length; i++) {
                        const resultObject = new InboundReplySms(res.rows[i].replyid,
                            res.rows[i].receiver,
                            res.rows[i].sender,
                            res.rows[i].message,
                            res.rows[i].reference,
                            res.rows[i].productkey,
                            res.rows[i].datesend);

                        results.push(resultObject);
                    }

                    resolve(results);
                }
            });
        });
    },

    //Get inbound sms entries from a specified sender (from a certain user account)
    getInboundSms(productKey, sender) {
        const queryText = `SELECT * FROM inbound_reply_sms WHERE inbound_reply_sms.productkey = $1 AND inbound_reply_sms.sender = $2 
        ORDER BY inbound_reply_sms.datesend DESC LIMIT 50`;
        const values = [productKey, sender];

        return new Promise((resolve, reject) => {

            db.query(queryText, values, (err, res) => {
                if (err) {
                    reject(new ApiError(err.message, 500));
                } else {
                    let results = [];

                    //Loop through results and create objects for every row.
                    for (let i = 0; i < res.rows.length; i++) {
                        const resultObject = new InboundReplySms(res.rows[i].replyid,
                            res.rows[i].receiver,
                            res.rows[i].sender,
                            res.rows[i].message,
                            res.rows[i].reference,
                            res.rows[i].productkey,
                            res.rows[i].datesend);

                        results.push(resultObject);
                    }

                    resolve(results);
                }
            });
        });
    }
};