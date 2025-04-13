const {
  FAVORITE_VALIDATION_SCHEME,
  LOGIN_VALIDATION_SCHEME,
  REGISTRATION_VALIDATION_SCHEME,
  USER_VALIDATION_SCHEME,
} = require('../utils/validationSchemes');

const validateSchema = (schema) => async (req, res, next) => {
  try {
    const { body } = req;
    await schema.validate(body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  validateFavorite: validateSchema(FAVORITE_VALIDATION_SCHEME),
  validateLogin: validateSchema(LOGIN_VALIDATION_SCHEME),
  validateRegistration: validateSchema(REGISTRATION_VALIDATION_SCHEME),
  validateUser: validateSchema(USER_VALIDATION_SCHEME),
};
