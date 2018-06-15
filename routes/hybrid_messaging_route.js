// Require express and sms manager
const express = require('express');
 const { sendHybrid } = require('../managers/hybrid_manager');
const auth = require('../middleware/auth');

// Get router
const router = express.Router();

// Configure root post endpoint
 router.post('/', auth, sendHybrid);

// Export these endpoints
module.exports = router;