import { ErrorMessage, Field, Form, Formik } from 'formik';

import { LOGIN_VALIDATION_SCHEME } from '../../utils/validationSchemes';

const initialValues = {
  email: '',
  password: '',
};

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
      initialValues={initialValues}
      validationSchema={LOGIN_VALIDATION_SCHEME}
      onSubmit={onSubmit}
    >
      {renderForm}
    </Formik>
  );
}

export default LoginForm;
