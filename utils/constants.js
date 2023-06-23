const SECRET_KEY = 'mySecretKey';
const URL_REGEX = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:\/?#[\]@!$&'()*+,;=]*)?$/igm;

module.exports = {
  SECRET_KEY,
  URL_REGEX,
};
