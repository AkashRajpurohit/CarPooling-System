const express = require('express');

const isAuthenticated = require('../../utils/isAuthenticated');

const {	publishRide, bookRide, getRides } = require('./ride.controller');

const router = express.Router();

router.use(isAuthenticated);

router.post('/', publishRide);
router.post('/all', getRides);
router.post('/book', bookRide);

module.exports = router;
