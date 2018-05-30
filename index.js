// Require modules
const express = require('express');
const SmsRoute = require('./routes/sms_route');
const status = require('./routes/status_route');
const test = require('./routes/test_setup_route');
const Sms = require('./domain/Sms.js');


// Configure app, middleware and routes
const app = express();
app.use(express.json());
app.use('/api/ifttt/v1/actions/sendsms', SmsRoute);
app.use('/api/ifttt/v1/status', status);
app.use('/api/ifttt/v1/test/setup', test);

//Catch all errors
app.use((err, req, res, next) => {
    console.log("API error occured:");
    console.log(err);

    //Send a response with the catched error.
    res.status(err.code).json(err);
});

// Configure port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}..`);
});

// Export app
module.exports = app;