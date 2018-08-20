// Require modules
const express = require('express');
const bodyParser = require('body-parser');
const OAuth2Route = require('./routes/oauth2_route');
const SmsRoute = require('./routes/sms_route');
const VoiceRoute = require('./routes/voice_route');
const StatusRoute = require('./routes/status_route');
const TestRoute = require('./routes/test_setup_route');
const LanguageRoute = require('./routes/language_route');
const hybridMessageRoute = require('./routes/hybrid_messaging_route');
const addContactRoute = require('./routes/addContact_route');
const inboundSmsRoute = require('./routes/inbound_sms_route');
const inboundSmsReplyRoute = require('./routes/inbound_sms_reply_route');

// Configure app, middleware and routes
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/ifttt/v1/oauth2', OAuth2Route);
app.use('/api/ifttt/v1/actions/send_sms', SmsRoute);
app.use('/api/ifttt/v1/actions/send_voice_message', VoiceRoute);
app.use('/api/ifttt/v1/status', StatusRoute);
app.use('/api/ifttt/v1/test/setup', TestRoute);
app.use('/api/ifttt/v1/actions/send_voice_message/fields/language/options',LanguageRoute);
app.use('/api/ifttt/v1/actions/send_hybrid_message', hybridMessageRoute);
app.use('/api/ifttt/v1/actions/add_contact', addContactRoute);
app.use('/api/ifttt/v1/triggers/inbound_sms', inboundSmsRoute);
app.use('/api/cm/v1/triggers/inbound_sms', inboundSmsReplyRoute);

//Catch all errors
app.use((err, req, res, next) => {
    console.log('API error occured:');
    //Check if the caught error is an ApiError
    try {
        res.status(err.errorCode).json(err.iftttResponse());
        console.log(err.toString());
    } catch (e) {
        console.log(err);
        res.status(500).json({"error" : "unknown error occured"})
    }
});

// Configure port
let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}..`);
});

// Export app
module.exports = app;