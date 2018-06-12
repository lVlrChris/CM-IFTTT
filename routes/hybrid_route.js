const express = require('express');
const { sendHybrid } = require('../managers/hybrid_manager');
const auth = require('../middleware/auth');

// Get router
const router = express.Router();

// Configure root language endpoint
router.post('/',auth,sendHybrid);

// Export these endpoints
module.exports = router;