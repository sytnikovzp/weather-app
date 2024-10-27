import { Formik, Form, Field, ErrorMessage } from 'formik';
// ==============================================================
import { REGISTRATION_FORM_INITIAL } from '../../constants';
import { REGISTRATION_VALIDATION_SCHEMA } from '../../utils/validationSchemes';

const RegistrationForm = ({ onRegister }) => {
  const onFormSubmit = ({ fullName, email, password }) => {
    onRegister(fullName, email, password);
  };

  const renderForm = ({ isValid }) => {
    return (
      <Form id='registration-form'>
        <h2>Реєстрація</h2>

        <div className='inputField'>
          <Field
            type='text'
            name='fullName'
            id='fullName'
            required
            placeholder='Повне імʼя'
          />
        </div>
        <ErrorMessage name='fullName'>
          {(msg) => <div className='error'>{msg}</div>}
        </ErrorMessage>

        <div className='inputField'>
          <Field
            type='email'
            name='email'
            id='email'
            required
            placeholder='E-mail'
          />
        </div>
        <ErrorMessage name='email'>
          {(msg) => <div className='error'>{msg}</div>}
        </ErrorMessage>

        <div className='inputField'>
          <Field
            type='password'
            name='password'
            id='password'
            required
            placeholder='Пароль'
          />
        </div>
        <ErrorMessage name='password'>
          {(msg) => <div className='error'>{msg}</div>}
        </ErrorMessage>

        <button type='submit' className='submitButton' disabled={!isValid}>
          Зареєструватися та увійти
        </button>
      </Form>
    );
  };

  return (
    <Formik
      initialValues={REGISTRATION_FORM_INITIAL}
      onSubmit={onFormSubmit}
      validationSchema={REGISTRATION_VALIDATION_SCHEMA}
      validateOnMount={true}
    >
      {renderForm}
    </Formik>
  );
};

export default RegistrationForm;
