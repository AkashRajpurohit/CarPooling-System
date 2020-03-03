const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: Number,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	profileCompleted: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
});

module.exports = User = mongoose.model('users', UserSchema);