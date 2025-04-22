import { ErrorMessage, Field, Form, Formik } from 'formik';

import { LOGIN_VALIDATION_SCHEME } from '../../utils/validationSchemes';

const initialValues = {
  email: '',
  password: '',
};

function LoginForm({ onSubmit, isSubmitting }) {
  const renderForm = ({ isValid }) => (
    <Form id='auth-form'>
      <h2>Авторизація</h2>

      <Field
        required
        id='email'
        name='email'
        placeholder='E-mail'
        type='email'
      />
      <div className='error-small-container'>
        <ErrorMessage name='email'>
          {(msg) => <div className='error'>{msg}</div>}
        </ErrorMessage>
      </div>

      <Field
        required
        id='password'
        name='password'
        placeholder='Пароль'
        type='password'
      />
      <div className='error-small-container'>
        <ErrorMessage name='password'>
          {(msg) => <div className='error'>{msg}</div>}
        </ErrorMessage>
      </div>

      <button disabled={!isValid || isSubmitting} type='submit'>
        {isSubmitting ? 'Вхід...' : 'УВІЙТИ'}
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
