import { ErrorMessage, Field, Form, Formik } from 'formik';

import { REGISTRATION_VALIDATION_SCHEME } from '../../utils/validationSchemes';

const initialValues = {
  fullName: '',
  email: '',
  password: '',
};

function RegistrationForm({ onSubmit, isSubmitting }) {
  const renderForm = ({ isValid }) => (
    <Form id='registration-form'>
      <h2>Реєстрація</h2>

      <Field
        required
        id='fullName'
        name='fullName'
        placeholder='Повне імʼя'
        type='text'
      />
      <div className='error-small-container'>
        <ErrorMessage name='fullName'>
          {(msg) => <div className='error'>{msg}</div>}
        </ErrorMessage>
      </div>

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
