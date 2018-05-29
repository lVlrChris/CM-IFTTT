const express = require('express');
const sms = require('./routes/sms_route');
const status = require('./routes/status_route');

const app = express();
app.use(express.json());
app.use('/api/ifttt/v1/actions/sms', sms);
app.use('/api/ifttt/v1/status', status);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}..`);
});

module.exports = app;