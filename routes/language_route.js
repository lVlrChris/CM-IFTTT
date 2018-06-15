const express = require('express');
const { getLanguages } = require('../managers/language_manager');
const auth = require('../middleware/auth');

// Get router
const router = express.Router();

// Configure root language endpoint
router.post('/',auth,getLanguages);

// Export these endpoints
module.exports = router;