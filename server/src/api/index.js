const express = require('express');

const user = require('./user/user.routes');
const profile = require('./profile/profile.routes');
const ride = require('./ride/ride.routes');

const router = express.Router();

router.use('/user', user);
router.use('/profile', profile);
router.use('/ride', ride);

module.exports = router;
