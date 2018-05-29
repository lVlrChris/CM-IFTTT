// Require express and sms manager
const express = require('express');
const { sendSms } = require('../managers/sms_manager');
const auth = require('../middleware/auth');

// Get router
const router = express.Router();

// Configure root post endpoint
router.post('/', auth, sendSms);

// Export these endpoints
module.exports = router;