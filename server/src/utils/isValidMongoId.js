const { Types } = require('mongoose');

module.exports = (id) => {
	return Types.ObjectId.isValid(id);
}