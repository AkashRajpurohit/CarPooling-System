const express = require('express');

const isAuthenticated = require('../../utils/isAuthenticated');

const { addProfile } = require('./profile.controller');

const router = express.Router();

router.use(isAuthenticated);

router.post('/', addProfile);

module.exports = router;
