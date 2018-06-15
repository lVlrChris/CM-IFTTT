// Require express and sms manager
const express = require('express');
const { addContact } = require('../managers/addContact_manager');
const auth = require('../middleware/auth');

// Get router
const router = express.Router();

// Configure root post endpoint
router.post('/', auth, addContact);

// Export these endpoints
module.exports = router;