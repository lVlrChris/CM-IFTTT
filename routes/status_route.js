const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, (req, res) => {

    res.status(200).send('Valid key');

});

// Export these endpoints
module.exports = router;