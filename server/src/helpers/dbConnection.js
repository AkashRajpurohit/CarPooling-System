const mongoose = require('mongoose');
const { MONGO_URI } = require('../config');

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('MongoDB Connected'))
	.catch(e => {
		console.log("Error in mongodb connection");
		process.exit(1);
	});
