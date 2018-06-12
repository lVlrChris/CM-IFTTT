// Require modules
const express = require('express');
const SmsRoute = require('./routes/sms_route');
const VoiceRoute = require('./routes/voice_route');
const StatusRoute = require('./routes/status_route');
const TestRoute = require('./routes/test_setup_route');
const LanguageRoute = require('./routes/language_route');
const HybridRoute = require('./routes/hybrid_route');

// Configure app, middleware and routes
const app = express();
app.use(express.json());
app.use('/api/ifttt/v1/actions/send_sms', SmsRoute);
app.use('/api/ifttt/v1/actions/send_voice_message', VoiceRoute);
app.use('/api/ifttt/v1/status', StatusRoute);
app.use('/api/ifttt/v1/test/setup', TestRoute);
app.use('/api/ifttt/v1/actions/send_voice_message/fields/language/options',LanguageRoute);
app.use('/api/ifttt/v1/actions/send_hybrid_message',HybridRoute);

//Catch all errors
app.use((err, req, res, next) => {

    //Check if the caught error is an ApiError
    try {
        console.log('API error occured:');
        console.log(err.toString());
        res.status(err.errorCode).json(err.toJSON());
    } catch (e) {
        console.log(err.toString());
        res.status(500).json({"error" : "unknown error occured"})
    }
});

// Configure port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}..`);
});

// Export app
module.exports = app;