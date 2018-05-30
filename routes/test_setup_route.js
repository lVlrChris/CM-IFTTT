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
                        sender: req.body.actionFields.sender,
                        body: req.body.actionFields.body,
                        receiver: req.body.actionFields.receiver,
                        token: req.body.actionFields.token
                    }
                }
            }
        },
        code: 200
    });
});

// Export these endpoints
module.exports = router;