const yup = require('yup');

const TITLE_NAME_SCHEMA = yup
  .string()
  .trim('Input cannot contain leading or trailing spaces')
  .min(2, 'Input must be at least 2 characters')
  .max(100, 'Input cannot exceed 100 characters')
  .matches(
    /^[A-Z][a-zA-Z0-9\s'–:.-]+(?:\s[A-Z][a-zA-Z0-9\s'–:.-]+)*$/,
    'Input must start with an uppercase letter [A-Z] and can contain letters [A-z], digits, spaces, apostrophes, and dashes.'
  )
  .required();

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

module.exports = {
  REGISTRATION_VALIDATION_SCHEMA,
  AUTH_VALIDATION_SCHEMA,
};
