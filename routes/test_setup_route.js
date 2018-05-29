const express = require('express');
const auth = require('../middleware/auth');

// Get router
const router = express.Router();

// Test object


// Root post endpoint
router.post('/', auth, (req, res) => {

    res.status(200).json({
        data: {
        },
        samples: {
            actions: {
                sendsms: {
                    sender: 'Kek',
                    body: 'Kek2',
                    receiver: 'Kek3',
                    token: 'Kek4'
                }
            }
        },
        code: 200
    });
});

// Export these endpoints
module.exports = router;