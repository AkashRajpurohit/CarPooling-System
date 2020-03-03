const bcrypt = require('bcryptjs');
const User = require('./user.model');

const successResponse = require('../../utils/successResponse');
const errorResponse = require('../../utils/errorResponse');

const Constants = require('../../utils/constants');

/*
 * ROUTE  - /api/v1/user/register
 * METHOD - POST
 * ACCESS - Public
 * BODY   - { name, email, phoneNumber, password }
 * DESC   - Register a new user
 */
const register = async (req, res, next) => {
	const { name, email, phoneNumber, password } = req.body;
	try {
		let user;

		user = await User.findOne({ email });

		if(user) {
			return res.status(400).json(errorResponse(Constants.EMAIL_ALREADY_EXISTS));
		}

		user = await User.findOne({ phoneNumber });

		if(user) {
			return res.status(400).json(errorResponse(Constants.PHONE_EXISTS));
		}

		const hashPassword = await bcrypt.hash(password, 10)

		const newUser = new User({
			name,
			email, 
			phoneNumber,
			password: hashPassword
		});

		await newUser.save();

		res.json(successResponse(Constants.BASIC_MESSAGE))

	} catch(e) {
		next(e, req, res, next);
	}
}

/*
 * ROUTE  - /api/v1/user/login
 * METHOD - POST
 * ACCESS - Public
 * BODY   - { email, password }
 * DESC   - Login user
 */
const login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if(!user) {
			return res.status(401).json(errorResponse(Constants.AUTHENTICATION_ERROR));
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if(!isMatch) {
			return res.status(401).json(errorResponse(Constants.AUTHENTICATION_ERROR));
		}

		const data = {
			profileCompleted: user.profileCompleted,
			name: user.name,
			email: user.email,
			userId: user._id
		};

		res.json(successResponse(Constants.BASIC_MESSAGE, data));

	} catch(e) {
		next(e, req, res, next);
	}
}


module.exports = {
	register,
	login
}