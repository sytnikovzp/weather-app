import { Formik, Form, Field, ErrorMessage } from 'formik';
// ==============================================================
import { AUTH_FORM } from '../../constants';
import { AUTH_VALIDATION_SCHEMA } from '../../utils/validationSchemes';

const LoginForm = ({ onLogin }) => {
  const onFormSubmit = ({ email, password }) => {
    onLogin(email, password);
  };

  const renderForm = ({ isValid }) => {
    return (
      <Form id='auth-form'>
        <h2>Авторизація</h2>

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
          Увійти
        </button>
      </Form>
    );
  };

  return (
    <Formik
      initialValues={AUTH_FORM}
      onSubmit={onFormSubmit}
      validationSchema={AUTH_VALIDATION_SCHEMA}
      validateOnMount={true}
    >
      {renderForm}
    </Formik>
  );
};

export default LoginForm;
