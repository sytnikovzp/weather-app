import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectAuthIsLoading } from '../../store/selectors/authSelectors';
import { loginThunk, registrationThunk } from '../../store/thunks/authThunks';

import Footer from '../../components/Footer/Footer';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

import './AuthPage.css';

function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authIsLoading = useSelector(selectAuthIsLoading);

  const handleAuth = useCallback(
    async (action, payload) => {
      setErrorMessage('');
      try {
        if (action === 'login') {
          await dispatch(loginThunk(payload)).unwrap();
        } else {
          await dispatch(registrationThunk(payload)).unwrap();
        }
        navigate('/');
      } catch (error) {
        setErrorMessage(error?.message);
      }
    },
    [dispatch, navigate]
  );

  return (
    <div id='auth-container'>
      <div className='error-big-container'>
        {errorMessage && <div className='error'>{errorMessage}</div>}
      </div>

      {isLoginMode ? (
        <LoginForm
          isSubmitting={authIsLoading}
          onSubmit={({ email, password }) =>
            handleAuth('login', { email, password })
          }
        />
      ) : (
        <RegistrationForm
          isSubmitting={authIsLoading}
          onSubmit={({ fullName, email, password }) =>
            handleAuth('registration', { fullName, email, password })
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
