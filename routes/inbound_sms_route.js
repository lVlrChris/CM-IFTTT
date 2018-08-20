const express = require('express');
const inboundSms = require('../managers/inbound_sms_manager');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, inboundSms.getInboundSms);

module.exports = router;