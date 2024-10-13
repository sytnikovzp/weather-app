/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// ==============================================================
import api from '../../api';
// ==============================================================
import LoginForm from '../../components/LoginForm/LoginForm';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import './AuthPage.css';

const AuthPage = ({ setIsAuthenticated }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      setErrorMessage('');
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('accessToken', data.accessToken);
      console.log('Login successful!');
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  const handleRegister = async (fullName, email, password) => {
    try {
      setErrorMessage('');
      await api.post('/auth/registration', {
        fullName,
        email,
        password,
      });
      console.log('Registration successful!');
      navigate('/auth');
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className='container'>
      {errorMessage && <div className='error'>{errorMessage}</div>}
      {isLoginMode ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <RegistrationForm onRegister={handleRegister} />
      )}
      <button
        id='switch-button'
        onClick={() => {
          setIsLoginMode(!isLoginMode);
          setErrorMessage('');
        }}
      >
        Switch to {isLoginMode ? 'Register' : 'Login'}
      </button>
    </div>
  );
};

export default AuthPage;
