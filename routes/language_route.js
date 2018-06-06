//writing code in different branch

const express = require('express');
const { getLanguages } = require('../managers/language_manager');
const auth = require('../middleware/auth');

// Get router
const router = express.Router();

// Configure root post endpoint
router.get('/',getLanguages);

// Export these endpoints
module.exports = router;