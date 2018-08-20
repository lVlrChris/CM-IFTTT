//Retrieve environment variables if possible
const envIftttServiceKey = process.env.IFTTT_SERVICE_KEY || '12345';
const envNotifireAppkey = process.env.APPKEY_NOTIFIRE;
const envOAuth2ClientID = process.env.OAUTH2_CLIENT_ID;
const envOAuth2ClientSecret = process.env.OAUTH2_CLIENT_SECRET;
const tempToken = process.env.OAUTH2_TEMP_TOKEN;

module.exports = {
    iftttServiceKey: envIftttServiceKey,
    notifireAppkey: envNotifireAppkey,
    oAuthID: envOAuth2ClientID,
    oAuthSecret: envOAuth2ClientSecret,
    oAuthTToken: tempToken
};