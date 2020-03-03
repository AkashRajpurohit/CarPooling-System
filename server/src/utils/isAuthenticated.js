const errorResponse = require('./errorResponse');
const Constants = require('./constants');

const isValidMongoId = require('./isValidMongoId');

module.exports = async (req, res, next) => {
  const userId = req.headers['user-id'];
  
  if(!userId) {
    return res.status(400).json(errorResponse(Constants.UNAUTHORIZED));
  }

  if(!isValidMongoId(userId)) {
    return res.status(400).json(errorResponse(Constants.UNAUTHORIZED));
  }

  req.userId = userId;

  next();
}