import * as yup from 'yup';

const TITLE_NAME_SCHEMA = yup.string().required('Це поле є обовʼязкове!');

const COORD_SCHEMA = yup.number().required();

const EMAIL_VALIDATION_SCHEMA = yup
  .string()
  .email('Введіть коректний e-mail')
  .required('E-mail є обовʼязковим полем!');

const PASSWORD_SCHEMA = yup
  .string()
  .min(8, 'Мінімальна довжина 8 символів')
  .required('Пароль є обовʼязковим полем!');

// ==============================================================

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
  cityName: TITLE_NAME_SCHEMA,
  country: TITLE_NAME_SCHEMA,
  latitude: COORD_SCHEMA,
  longitude: COORD_SCHEMA,
});

export {
  REGISTRATION_VALIDATION_SCHEMA,
  AUTH_VALIDATION_SCHEMA,
  FAVORITES_SCHEMA,
};
