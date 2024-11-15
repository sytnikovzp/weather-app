import * as yup from 'yup';

const TITLE_NAME_REQUIRED_SCHEME = yup
  .string('Це поле має бути рядком')
  .required('Це поле є обовʼязкове!');

const COORD_REQUIRED_SCHEME = yup
  .number('Це поле має бути числом')
  .required('Це поле є обовʼязкове');

const EMAIL_REQUIRED_SCHEME = yup
  .string('Це поле має бути рядком')
  .email('Введіть коректний e-mail')
  .required('E-mail є обовʼязковим полем');

const PASSWORD_REQUIRED_SCHEME = yup
  .string('Це поле має бути рядком')
  .min(8, 'Мінімальна довжина 8 символів')
  .max(20, 'Введені дані не можуть перевищувати 20 символів')
  .required('Пароль є обовʼязковим полем');

// ==============================================================

const REGISTRATION_VALIDATION_SCHEME = yup.object().shape({
  fullName: TITLE_NAME_REQUIRED_SCHEME,
  email: EMAIL_REQUIRED_SCHEME,
  password: PASSWORD_REQUIRED_SCHEME,
});

const AUTH_VALIDATION_SCHEME = yup.object().shape({
  email: EMAIL_REQUIRED_SCHEME,
  password: PASSWORD_REQUIRED_SCHEME,
});

const FAVORITES_SCHEME = yup.object().shape({
  cityName: TITLE_NAME_REQUIRED_SCHEME,
  country: TITLE_NAME_REQUIRED_SCHEME,
  latitude: COORD_REQUIRED_SCHEME,
  longitude: COORD_REQUIRED_SCHEME,
});

export {
  REGISTRATION_VALIDATION_SCHEME,
  AUTH_VALIDATION_SCHEME,
  FAVORITES_SCHEME,
};
