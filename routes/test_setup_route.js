const express = require('express');
const auth = require('../middleware/auth');

// Get router
const router = express.Router();

// Test object


// Root post endpoint
router.post('/', auth, (req, res) => {

    res.status(200).json({
        data: {
            samples: {
                actions: {
                    sendsms: {
                        sender: req.body.sender,
                        body: req.body.body,
                        receiver: req.body.receiver,
                        token: req.body.token
                    }
                }
            }
        },
        code: 200
    });
});

// Export these endpoints
module.exports = router;