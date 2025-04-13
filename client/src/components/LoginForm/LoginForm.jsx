import { ErrorMessage, Field, Form, Formik } from 'formik';

// ==============================================================
import { AUTH_FORM_INITIAL } from '../../constants';
import { LOGIN_VALIDATION_SCHEME } from '../../utils/validationSchemes';

function LoginForm({ onSubmit }) {
  const renderForm = ({ isValid }) => (
    <Form id='auth-form'>
      <h2>Авторизація</h2>
      <div className='inputField'>
        <Field
          required
          id='email'
          name='email'
          placeholder='E-mail'
          type='email'
        />
      </div>
      <ErrorMessage name='email'>
        {(msg) => <div className='error'>{msg}</div>}
      </ErrorMessage>
      <div className='inputField'>
        <Field
          required
          id='password'
          name='password'
          placeholder='Пароль'
          type='password'
        />
      </div>
      <ErrorMessage name='password'>
        {(msg) => <div className='error'>{msg}</div>}
      </ErrorMessage>
      <button className='submitButton' disabled={!isValid} type='submit'>
        Увійти
      </button>
    </Form>
  );
  return (
    <Formik
      validateOnMount
      initialValues={AUTH_FORM_INITIAL}
      validationSchema={LOGIN_VALIDATION_SCHEME}
      onSubmit={onSubmit}
    >
      {renderForm}
    </Formik>
  );
}

export default LoginForm;
