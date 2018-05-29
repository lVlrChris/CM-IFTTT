const express = require('express');
const auth = require('../middleware/auth');

// Get router
const router = express.Router();

// Root post endpoint
router.post('/', auth, (req, res) => {

    res.status(200).json({message: '', code: 200});
});

// Export these endpoints
module.exports = router;