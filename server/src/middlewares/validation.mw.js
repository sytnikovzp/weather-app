const {
  REGISTRATION_VALIDATION_SCHEMA,
  AUTH_VALIDATION_SCHEMA,
  FAVORITES_SCHEMA,
} = require('../utils/validationSchemes');

const validateSchema = (schema) => async (req, res, next) => {
  const { body } = req;
  try {
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
  validateRegistration: validateSchema(REGISTRATION_VALIDATION_SCHEMA),
  validateAuth: validateSchema(AUTH_VALIDATION_SCHEMA),
  validateFavorites: validateSchema(FAVORITES_SCHEMA),
};
