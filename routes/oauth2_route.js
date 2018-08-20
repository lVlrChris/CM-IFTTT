const express = require('express');
const oauth2 = require('../auth/oauth2_manager');

const router = express.Router();

router.get('/authorize', oauth2.authorize);
router.post('/token', oauth2.token);

module.exports = router;