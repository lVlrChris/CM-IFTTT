//Retrieve environment variables if possible
const envIftttServiceKey = process.env.IFTTT_SERVICE_KEY || '12345';
const envNotifireAppkey = process.env.APPKEY_NOTIFIRE;

module.exports = {
    iftttServiceKey: envIftttServiceKey,
    notifireAppkey: envNotifireAppkey
};