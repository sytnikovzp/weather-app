const yup = require('yup');

const TITLE_NAME_SCHEMA = yup.string().required();

const EMAIL_VALIDATION_SCHEMA = yup.string().email().required();

const PASSWORD_SCHEMA = yup.string().required();

// ====================================================

const REGISTRATION_VALIDATION_SCHEMA = yup.object().shape({
  fullName: TITLE_NAME_SCHEMA,
  email: EMAIL_VALIDATION_SCHEMA,
  password: PASSWORD_SCHEMA,
});

const AUTH_VALIDATION_SCHEMA = yup.object().shape({
  email: EMAIL_VALIDATION_SCHEMA,
  password: PASSWORD_SCHEMA,
});

const FAVORITES_SCHEMA = yup.object().shape({
  openWeatherId: yup.number().required(),
  cityName: TITLE_NAME_SCHEMA,
  country: TITLE_NAME_SCHEMA,
});

module.exports = {
  REGISTRATION_VALIDATION_SCHEMA,
  AUTH_VALIDATION_SCHEMA,
  FAVORITES_SCHEMA
};
