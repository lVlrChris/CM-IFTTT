const express = require('express');
const auth = require('../middleware/auth');

// Get router
const router = express.Router();

// Root post endpoint
router.post('/', auth, (req, res) => {

    // Data that gets returned when the test/setup endpoint test runs on IFTTT.
    res.status(200).json({
        data: {
            samples: {
                actions: {
                    send_sms: {
                        sender: 'Jan',
                        body: 'De man',
                        receiver: '0031612345678',
                        token: 'FakeTestKey'
                    },
                    send_voice_message:{
                        sender: '0031612345678',
                        body: 'De man',
                        receiver: '0031612345678',
                        language:'nl-NL',
                        token: 'FakeTestKey',
                        username: 'CMAvans2',
                        key: '472ktDj#GW$5c|BebL8JQ0s)'
                    },
                    send_hybrid_message : {
                        sender: '0031612345678',
                        body: 'De man',
                        receiver: '0031612345678',
                        token: 'FakeTestKey',
                        appKey: '472ktDj#GW$5c|BebL8JQ0s)'
                    },
                    add_contact : {
                        "email" : "fake",
                        "firstName" : "fake",
                        "lastName" : "fake",
                        "insertion" : "fake",
                        "groupID" : "fake",
                        "phoneNumber" : "0031612345678",
                        "accountID" : "fake",
                        "token" : "fake"
                    },
                    number_validation:{
                        phoneNumber: '0031612345678',
                        phoneToken: 'FakeTestKey'
                    }
                }
            },
            code: 200
        }
    });

});

// Export these endpoints
module.exports = router;