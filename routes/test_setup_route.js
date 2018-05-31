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
                        sender: 'Jan',
                        body: 'De man',
                        receiver: '0031612345678',
                        token: 'XeQ9D7IjomnZWMsjuHDgLhyEvYLvwAoAdJRyzF2odxspOvU90ci4lsRijfTAvR9y'
                    }
                }
            }
        },
        code: 200
    });
});

// Export these endpoints
module.exports = router;