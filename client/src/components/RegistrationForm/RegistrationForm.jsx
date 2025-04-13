import { ErrorMessage, Field, Form, Formik } from 'formik';

import { REGISTRATION_FORM_INITIAL } from '../../constants';
import { REGISTRATION_VALIDATION_SCHEME } from '../../utils/validationSchemes';

function RegistrationForm({ onSubmit }) {
  const renderForm = ({ isValid }) => (
    <Form id='registration-form'>
      <h2>Реєстрація</h2>
      <div className='inputField'>
        <Field
          required
          id='fullName'
          name='fullName'
          placeholder='Повне імʼя'
          type='text'
        />
      </div>
      <ErrorMessage name='fullName'>
        {(msg) => <div className='error'>{msg}</div>}
      </ErrorMessage>
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
        Зареєструватися та увійти
      </button>
    </Form>
  );

  return (
    <Formik
      validateOnMount
      initialValues={REGISTRATION_FORM_INITIAL}
      validationSchema={REGISTRATION_VALIDATION_SCHEME}
      onSubmit={onSubmit}
    >
      {renderForm}
    </Formik>
  );
}

export default RegistrationForm;
