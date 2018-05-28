const express = require('express');
const sms = require('./routes/sms');

const app = express();
app.use(express.json());
app.use('/api/ifttt/v1/actions/sms', sms);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}..`);
});

module.exports = app;