// Require express and sms manager
const express = require('express');
// const { hybrid_message } = require('../managers/hybrid_message_manager');
const auth = require('../middleware/auth');

// Get router
const router = express.Router();

// Configure root post endpoint
// router.post('/', auth, hybrid_message);

// Export these endpoints
module.exports = router;