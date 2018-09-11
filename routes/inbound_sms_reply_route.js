const express = require('express');
const inboundSmsReply = require('../managers/inbound_sms_reply_manager');
const auth = require('../middleware/auth');

const router = express.Router();

router.all('/', inboundSmsReply.setSmsReply);

module.exports = router;
