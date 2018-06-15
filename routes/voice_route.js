// Require express and sms manager
const express = require('express');
const { sendVoice } = require('../managers/voice_manager');
const auth = require('../middleware/auth');

// Get router
const router = express.Router();

// Configure root post endpoint
router.post('/', auth, sendVoice);

// Export these endpoints
module.exports = router;