import { ErrorMessage, Field } from 'formik';

import ErrorMessageBlock from '../ErrorMessageBlock/ErrorMessageBlock';

function FormField({ id, name, type, placeholder, required }) {
  return (
    <>
      <Field
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
      <div className='error-small-container'>
        <ErrorMessage name={name}>
          {(message) => <ErrorMessageBlock message={message} />}
        </ErrorMessage>
      </div>
    </>
  );
}

export default FormField;
