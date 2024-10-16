import { useState } from 'react';

const RegistrationForm = ({ onRegister }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(fullName, email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Реєстрація</h2>
      <div className='inputField'>
        <label>Повне імʼя:</label>
        <input
          type='text'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div className='inputField'>
        <label>E-mail:</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className='inputField'>
        <label>Пароль:</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type='submit' className='submitButton'>
        Зареєструватися та увійти
      </button>
    </form>
  );
};

export default RegistrationForm;
