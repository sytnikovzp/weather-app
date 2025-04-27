import { Form, Formik } from 'formik';

import { REGISTRATION_VALIDATION_SCHEME } from '../../utils/validationSchemes';

import FormField from '../FormField/FormField';

const initialValues = {
  fullName: '',
  email: '',
  password: '',
};

function RegistrationForm({ onSubmit }) {
  const renderForm = ({ isSubmitting, isValid }) => (
    <Form id='registration-form'>
      <h2>Реєстрація</h2>

      <FormField
        required
        id='fullName'
        name='fullName'
        placeholder='Повне імʼя'
        type='text'
      />

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
        {isSubmitting ? 'Реєстрація...' : 'ЗАРЕЄСТРУВАТИСЯ ТА УВІЙТИ'}
      </button>
    </Form>
  );

  return (
    <Formik
      validateOnMount
      initialValues={initialValues}
      validationSchema={REGISTRATION_VALIDATION_SCHEME}
      onSubmit={onSubmit}
    >
      {renderForm}
    </Formik>
  );
}

export default RegistrationForm;
