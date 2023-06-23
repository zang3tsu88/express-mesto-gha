const { celebrate, Joi, Segments } = require('celebrate');
// const URL_REGEX = require('../utils/constants');

const validateSignUp = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  }),
});

const validateLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  }),
});

const validateUpdateProfile = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateUpdateAvatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().uri(),
  }),
});

const validateUserId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

const validateCardId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

const validateCreateCard = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  }),
});

module.exports = {
  validateSignUp,
  validateLogin,
  validateUpdateProfile,
  validateUpdateAvatar,
  validateUserId,
  validateCardId,
  validateCreateCard,
};
