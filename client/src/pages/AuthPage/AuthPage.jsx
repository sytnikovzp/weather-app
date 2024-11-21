import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// ==============================================================
import { authRest } from '../../api/rest';
// ==============================================================
import LoginForm from '../../components/LoginForm/LoginForm';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

function AuthPage({ setIsAuthenticated }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleAuth = useCallback(
    async (action, ...args) => {
      try {
        setErrorMessage('');
        if (action === 'login') {
          await authRest.login(...args);
        } else {
          await authRest.registration(...args);
        }
        setIsAuthenticated(true);
        navigate('/');
      } catch (error) {
        console.error(
          `${action === 'login' ? 'Авторизація' : 'Реєстрація'} неуспішна:`,
          error.message
        );
        setErrorMessage(
          action === 'login'
            ? 'Авторизація неуспішна. Перевірте облікові дані.'
            : 'Реєстрація неуспішна. Спробуйте знову.'
        );
      }
    },
    [setIsAuthenticated, navigate]
  );

  return (
    <div className='auth-container'>
      {errorMessage && <div className='error'>{errorMessage}</div>}
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
        id='switch-button'
        onClick={() => {
          setIsLoginMode(!isLoginMode);
          setErrorMessage('');
        }}
      >
        Перейти до
        {isLoginMode ? ' реєстрації користувача' : ' авторизації користувача'}
      </button>
    </div>
  );
}

export default AuthPage;
