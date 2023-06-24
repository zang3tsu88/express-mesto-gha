const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');
const { SECRET_KEY } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Unauthorized('Authorization required.');
  }

  req.user = payload;
  next();
};
