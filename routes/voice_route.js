// Require express and sms manager
const express = require('express');
const { sendVoice } = require('../managers/sms_manager'); // Must change sms_manager to voice manager?
const auth = require('../middleware/auth');

// Get router
const router = express.Router();

// Configure root post endpoint
router.post('/', auth, sendVoice);

// Export these endpoints
module.exports = router;