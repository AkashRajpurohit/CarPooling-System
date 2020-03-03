const Ride = require('./ride.model');
const moment = require('moment');
const getDistance = require('../../utils/getDistance');

const successResponse = require('../../utils/successResponse');
const errorResponse = require('../../utils/errorResponse');

const Constants = require('../../utils/constants');
const getRecommendation = require('../../utils/recommendation');

/*
 * ROUTE  - /api/v1/ride/
 * METHOD - POST
 * ACCESS - Private
 * BODY   - { from: { latitude, longitude }, to: { latitude, longitude }, noOfSeats, price, datetime, isReturnJourney, datetime2 }
 * DESC   - Publish a new ride
 */
const publishRide = async (req, res, next) => {
	const { from, to, noOfSeats, price, datetime, isReturnJourney, datetime2 } = req.body;
	const { userId } = req;

	try {
		const rideAlreadyActiveForUser = await Ride.findOne({ offeredBy: userId });

		if(rideAlreadyActiveForUser) {
			return res.status(403).json(errorResponse(Constants.RIDE_ALREADY_ACTIVE))
		}

		const newJourney = new Ride({
			from: {
				type: 'Point',
				coordinates: [from.longitude, from.latitude]
			},
			to: {
				type: 'Point',
				coordinates: [to.longitude, to.latitude]
			},
			noOfSeats,
			price,
			offeredBy: userId,
			datetime
		});

		const _data = await newJourney.save();

		if(isReturnJourney) {
			const returnJourney = new Ride({
				from: {
					type: 'Point',
					coordinates: [to.longitude, to.latitude]
				},
				to: {
					type: 'Point',
					coordinates: [from.longitude, from.latitude]
				},
				noOfSeats,
				price,
				offeredBy: userId,
				datetime: datetime2
			});

			await returnJourney.save();
		}

		const data = {
			noOfSeats: _data.noOfSeats,
			rideId: _data._id
		};

		for(let i = 0; i < _data.takenBy.length; i++) {
			data['noOfSeats'] -= _data.takenBy[i].count
		}

		res.json(successResponse(Constants.BASIC_MESSAGE, data));

	} catch(e) {
		next(e, req, res, next);
	}
}

/*
 * ROUTE  - /api/v1/ride/book
 * METHOD - POST
 * ACCESS - Private
 * BODY   - { rideId, count }
 * DESC   - Book a new ride
 */
const bookRide = async (req, res, next) => {
	const { rideId, count } = req.body;
	const { userId } = req;
	try {
		const ride = await Ride.findById(rideId);

		if(!ride) {
			return res.status(404).json(errorResponse(Constants.ERROR_404));
		}
		let totalRidesLeft = ride.noOfSeats;

		for (let i = 0; i < ride.takenBy.length; i++) {
			const curr = ride.takenBy[i];

			totalRidesLeft -= curr.count;

			if(totalRidesLeft < 0) {
				return res.status(400).json(errorResponse(Constants.RIDE_FULL));
			}

			if(curr.user == userId) {
				return res.status(400).json(errorResponse(Constants.ALREADY_BOOKED_RIDE));
			}
		}

		if(totalRidesLeft - count < 0) {
			return res.status(400).json(errorResponse(Constants.CANNOT_BOOK))
		}

		ride.takenBy = [...ride.takenBy, { user: req.userId, count }];

		await ride.save();

		res.json(successResponse(Constants.BASIC_MESSAGE));

	} catch(e) {
		next(e, req, res, next);
	}
}

/*
 * ROUTE  - /api/v1/ride/all
 * METHOD - POST
 * ACCESS - Private
 * BODY   - { from: { latitude, longitude }, to: { latitude, longitude }, datetime }
 * DESC   - Get rides
 */
const getRides = async (req, res, next) => {
	try {
		const { userId } = req;
		const { from, to, datetime } = req.body;

		let data = await Ride.find({
			datetime : { 
				$gte: moment(datetime).toDate(), 
				$lte: moment(datetime).endOf('day').toDate() 
			},
		}).populate('offeredBy', ['name', 'email']);

		data = data.map(x => {
			const fromDistance = getDistance(from.latitude, from.latitude, x.from.coordinates[1], x.from.coordinates[0])

			const toDistance = getDistance(to.latitude, to.latitude, x.to.coordinates[1], x.to.coordinates[0])

			return {
				...x._doc,
				datetime: moment(x._doc.datetime).format("Do MMM YYYY"),
				time: moment(x._doc.datetime).format("hh:mm:ss a"),
				dist: parseInt(fromDistance) + parseInt(toDistance),
				score: 0,
				riderRating: parseFloat(Math.random() * 5).toFixed(1)
			}
		});

		const users = getRecommendation(data);

		res.json(successResponse(Constants.BASIC_MESSAGE, users));

	} catch(e) {
		next(e, req, res, next);
	}
}

module.exports = {
	publishRide,
	bookRide,
	getRides
}