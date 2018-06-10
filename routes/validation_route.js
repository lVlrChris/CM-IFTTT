// Require express and sms manager
const express = require('express');
const { sendValidation } = require('../managers/numberValidation_manager');
const auth = require('../middleware/auth');

// Get router
const router = express.Router();

// Configure root post endpoint
router.post('/', auth, sendValidation);

// Export these endpoints
module.exports = router;