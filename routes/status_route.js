// Require express and authentication function
const express = require('express');
const auth = require('../middleware/auth');

// Get router
const router = express.Router();

// Root get endpoint
router.get('/', auth, (req, res) => {

    // Send status
    res.status(200).send('Valid key');

});

// Export these endpoints
module.exports = router;