const {
  REGISTRATION_VALIDATION_SCHEME,
  AUTH_VALIDATION_SCHEME,
  FAVORITES_SCHEME,
} = require('../utils/validationSchemes');

const validateSchema = (schema) => async (req, res, next) => {
  try {
    const { body } = req;
    await schema.validate(body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  validateRegistration: validateSchema(REGISTRATION_VALIDATION_SCHEME),
  validateAuth: validateSchema(AUTH_VALIDATION_SCHEME),
  validateFavorites: validateSchema(FAVORITES_SCHEME),
};
