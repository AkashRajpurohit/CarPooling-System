const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const RideSchema = Schema({
	from: {
		type: pointSchema,
		required: true
	},
	to: {
		type: pointSchema,
		required: true
	},
	offeredBy: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	takenBy: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			},
			count: {
				type: Number,
				default: 1
			}
		}
	],
	noOfSeats: {
		type: Number,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	active: {
		type: Boolean,
		default: true
	},
	datetime: {
		type: Date,
		required: true
	}
}, {
	timestamps: true
});

module.exports = Ride = mongoose.model('rides', RideSchema);