const bcrypt = require('bcryptjs');
const Profile = require('./profile.model');
const User = require('../user/user.model');

const successResponse = require('../../utils/successResponse');
const errorResponse = require('../../utils/errorResponse');

const Constants = require('../../utils/constants');

/*
 * ROUTE  - /api/v1/profile
 * METHOD - POST
 * ACCESS - Private
 * BODY   - { country, state, zipcode, drivingId, carName, conditions }
 * DESC   - Fill the user profile
 */
const addProfile = async (req, res, next) => {
	try {
		const { userId } = req;

		const { country, state, zipcode, drivingId, carName, conditions } = req.body;

		const newProfile = new Profile({
			country,
			state,
			zipcode,
			drivingId,
			carName,
			conditions,
			user: userId
		});

		await newProfile.save();

		const user = await User.findById(userId);

		user.profileCompleted = true;

		await user.save();

		res.json(successResponse(Constants.BASIC_MESSAGE));

	} catch(e) {
		next(e, req, res, next);
	}
}

module.exports = {
	addProfile
}