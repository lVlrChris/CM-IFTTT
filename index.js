// Require modules
const express = require('express');
const sms = require('./routes/sms_route');
const status = require('./routes/status_route');
const test = require('./routes/test_setup_route');

// Configure app, middleware and routes
const app = express();
app.use(express.json());
app.use('/api/ifttt/v1/actions/sendsms', sms);
app.use('/api/ifttt/v1/status', status);
app.use('/api/ifttt/v1/test/setup', test);

// Configure port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}..`);
});

// Export app
module.exports = app;