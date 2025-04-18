import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { authService } from '../../services';

import Footer from '../../components/Footer/Footer';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

import './AuthPage.css';

function AuthPage({ checkAuthentication }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleAuth = useCallback(
    async (action, ...args) => {
      try {
        setErrorMessage('');
        if (action === 'login') {
          await authService.login(...args);
        } else {
          await authService.registration(...args);
        }
        checkAuthentication();
        navigate('/');
      } catch (error) {
        setErrorMessage(error.response?.data?.message);
      }
    },
    [checkAuthentication, navigate]
  );

  return (
    <div id='auth-container'>
      <div className='error-big-container'>
        {errorMessage && <div className='error'>{errorMessage}</div>}
      </div>

      {isLoginMode ? (
        <LoginForm
          onSubmit={({ email, password }) =>
            handleAuth('login', email, password)
          }
        />
      ) : (
        <RegistrationForm
          onSubmit={({ fullName, email, password }) =>
            handleAuth('registration', fullName, email, password)
          }
        />
      )}

      <button
        id='auth-switch-button'
        onClick={() => {
          setIsLoginMode(!isLoginMode);
          setErrorMessage('');
        }}
      >
        Перейти до
        {isLoginMode ? ' реєстрації ' : ' авторизації '}
        користувача
      </button>

      <Footer />
    </div>
  );
}

export default AuthPage;
