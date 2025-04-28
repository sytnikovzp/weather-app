import { Form, Formik } from 'formik';

import { LOGIN_VALIDATION_SCHEME } from '../../../utils/validationSchemes';

import FormField from '../FormField/FormField';

const initialValues = {
  email: '',
  password: '',
};

function LoginForm({ onSubmit }) {
  const renderForm = ({ isSubmitting, isValid }) => (
    <Form id='auth-form'>
      <h2>Авторизація</h2>
      <FormField
        required
        id='email'
        name='email'
        placeholder='E-mail'
        type='email'
      />
      <FormField
        required
        id='password'
        name='password'
        placeholder='Пароль'
        type='password'
      />
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
