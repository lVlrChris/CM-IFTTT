const express = require('express');
const { sendSms } = require('../managers/sms_manager');

const router = express.Router();

router.post('/', sendSms);

// Export these endpoints
module.exports = router;