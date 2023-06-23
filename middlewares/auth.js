const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');
const { SECRET_KEY } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new Unauthorized('Authorization required.');
    // хм, надо так или оборачивать в next()
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Unauthorized('Authorization required.');
  }

  req.user = payload;
  next();
};
