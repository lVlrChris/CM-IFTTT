const express = require('express');
const auth = require('../middleware/auth');

// Get router
const router = express.Router();

// Fake values
const fakeSender = "0031512345678";
const fakeReceiver = "0031612345678";
const fakeBody = "This is the body of an IFTTT test message.";
const fakeMessagingToken = "0000000-0000-0000-0000-000000000000";
const fakeVoiceToken = "0000000-0000-0000-0000-000000000000";
const fakeVoiceUser = "FakeVoiceUser";
const fakeVoicePassword = "FakeVoicePassword";
const fakeNotifireKey = "FakeNotifireKey";

// Root post endpoint
router.post('/', auth, (req, res) => {

    // Data that gets returned when the test/setup endpoint test runs on IFTTT.
    res.status(200).json({
        data: {
            samples: {
                actions: {
                    send_sms: {
                        sender: fakeSender,
                        body: fakeBody,
                        receiver: fakeReceiver,
                        token: fakeMessagingToken
                    },
                    send_voice_message:{
                        sender: fakeReceiver,
                        body: fakeBody,
                        receiver: fakeReceiver,
                        language:'nl-NL',
                        token: fakeVoiceToken,
                        username: fakeVoiceUser,
                        key: fakeVoicePassword
                    },
                    send_hybrid_message : {
                        sender: fakeSender,
                        body: fakeBody,
                        receiver: fakeReceiver,
                        token: fakeMessagingToken,
                        appKey: fakeNotifireKey
                    },
                    add_contact : {
                        email : "fake",
                        firstName : "fake",
                        lastName : "fake",
                        insertion : "fake",
                        groupID : "fake",
                        phoneNumber : fakeReceiver,
                        accountID : "fake",
                        token : fakeMessagingToken
                    },
                    number_validation:{
                        phoneNumber: fakeReceiver,
                        phoneToken: 'FakePhoneToken'
                    }
                },
                triggers:{
                    inbound_sms : {
                        receiver : "fake",
                        specified_sender : 'fake'
                    }
                }
            },
            code: 200
        }
    });
});

// Export these endpoints
module.exports = router;