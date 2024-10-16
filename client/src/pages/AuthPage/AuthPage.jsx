/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// ==============================================================
import api from '../../api';
// ==============================================================
import LoginForm from '../../components/LoginForm/LoginForm';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

const AuthPage = ({ setIsAuthenticated }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const loginHandle = async (email, password) => {
    try {
      setErrorMessage('');
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('accessToken', data.accessToken);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      setErrorMessage('Авторизація неуспішна. Перевірте свои облікові данні.');
    }
  };

  const registrationHandle = async (fullName, email, password) => {
    try {
      setErrorMessage('');
      const { data } = await api.post('/auth/registration', {
        fullName,
        email,
        password,
      });
      localStorage.setItem('accessToken', data.accessToken);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      setErrorMessage('Реєстрація неуспішна. Спробуйте знову.');
    }
  };

  return (
    <div className='auth-container'>
      {errorMessage && <div className='error'>{errorMessage}</div>}
      {isLoginMode ? (
        <LoginForm onLogin={loginHandle} />
      ) : (
        <RegistrationForm onRegister={registrationHandle} />
      )}
      <button
        id='switch-button'
        onClick={() => {
          setIsLoginMode(!isLoginMode);
          setErrorMessage('');
        }}
      >
        Перейти до {isLoginMode ? 'реєстрації користувача' : 'авторизації'}
      </button>
    </div>
  );
};

export default AuthPage;
