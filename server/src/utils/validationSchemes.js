const yup = require('yup');

const STRING_SCHEME = yup
  .string('Це має бути рядком')
  .trim('Введені дані не можуть містити пробіли на початку або в кінці')
  .max(100, 'Введені дані не можуть перевищувати 100 символів');

const COORDINATE_REQUIRED_SCHEME = yup
  .number('Це має бути числом')
  .required('Будь ласка, введіть координати');

const EMAIL_SCHEME = yup
  .string('Це має бути рядком')
  .email('Введіть коректний e-mail');

const PASSWORD_REQUIRED_SCHEME = yup
  .string('Це має бути рядком')
  .trim('Введені дані не можуть містити пробіли на початку або в кінці')
  .min(8, 'Введені дані мають бути не менше 8 символів')
  .max(20, 'Введені дані не можуть перевищувати 20 символів')
  .matches(/[a-z]/, 'Пароль повинен містити хоча б одну маленьку літеру')
  .matches(/[A-Z]/, 'Пароль повинен містити хоча б одну велику літеру')
  .matches(/\d/, 'Пароль повинен містити хоча б одну цифру')
  .required('Будь ласка, введіть пароль');

const REGISTRATION_VALIDATION_SCHEME = yup.object().shape({
  fullName: STRING_SCHEME.required('Будь ласка, введіть повне ім`я'),
  email: EMAIL_SCHEME.required('Будь ласка, введіть email'),
  password: PASSWORD_REQUIRED_SCHEME,
});

const LOGIN_VALIDATION_SCHEME = yup.object().shape({
  email: EMAIL_SCHEME.required('Будь ласка, введіть email'),
  password: PASSWORD_REQUIRED_SCHEME,
});

const FAVORITE_VALIDATION_SCHEME = yup.object().shape({
  cityName: STRING_SCHEME.required('Будь ласка, введіть назву міста'),
  country: STRING_SCHEME.required('Будь ласка, введіть назву країни'),
  latitude: COORDINATE_REQUIRED_SCHEME,
  longitude: COORDINATE_REQUIRED_SCHEME,
});

const USER_VALIDATION_SCHEME = yup.object().shape({
  fullName: STRING_SCHEME.required('Будь ласка, введіть повне ім`я'),
  email: EMAIL_SCHEME.nullable(),
});

module.exports = {
  FAVORITE_VALIDATION_SCHEME,
  LOGIN_VALIDATION_SCHEME,
  REGISTRATION_VALIDATION_SCHEME,
  USER_VALIDATION_SCHEME,
};
