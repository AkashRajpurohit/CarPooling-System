const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	country: {
		type: String,
	},
	state: {
		type: String
	},
	zipcode: {
		type: Number,
	},
	drivingId: {
		type: String,
		required: true
	},
	carName: {
		type: String,
		required: true
	},
	conditions: [
		{
			question: {
				type: String
			},
			answer: {
				type: Boolean
			}
		}
	],
}, {
	timestamps: true
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);