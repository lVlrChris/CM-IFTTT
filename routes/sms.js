const express = require('express');
const { sendSms } = require('../managers/Sms_Manager');

const router = express.Router();

router.post('/', sendSms);

// Export these endpoints
module.exports = router;