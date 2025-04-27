import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectAuthenticationError } from '../../store/selectors/authenticationSelectors';
import { clearAuthenticationStore } from '../../store/slices/authenticationSlice';
import {
  loginThunk,
  registrationThunk,
} from '../../store/thunks/authenticationThunks';

import ErrorMessageBlock from '../../components/ErrorMessageBlock/ErrorMessageBlock';
import Footer from '../../components/Footer/Footer';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

import './AuthPage.css';

function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authenticationError = useSelector(selectAuthenticationError);

  const toggleMode = useCallback(() => {
    dispatch(clearAuthenticationStore());
    setIsLoginMode((prev) => !prev);
  }, [dispatch]);

  const handleAuth = useCallback(
    async (authThunk, payload) => {
      await dispatch(authThunk(payload));
      navigate('/');
    },
    [dispatch, navigate]
  );

  return (
    <div className='auth-container'>
      <div className='error-big-container'>
        {authenticationError && (
          <ErrorMessageBlock message={authenticationError.message} />
        )}
      </div>

      {isLoginMode ? (
        <LoginForm
          onSubmit={({ email, password }) =>
            handleAuth(loginThunk, { email, password })
          }
        />
      ) : (
        <RegistrationForm
          onSubmit={({ fullName, email, password }) =>
            handleAuth(registrationThunk, { fullName, email, password })
          }
        />
      )}

      <button className='auth-switch-button' onClick={toggleMode}>
        Перейти до
        {isLoginMode ? ' реєстрації ' : ' авторизації '}
        користувача
      </button>

      <Footer />
    </div>
  );
}

export default AuthPage;
