import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectAuthenticationError,
  selectAuthenticationIsFetching,
} from '../../store/selectors/authenticationSelectors';
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

  const authenticationIsFetching = useSelector(selectAuthenticationIsFetching);
  const authenticationError = useSelector(selectAuthenticationError);

  const handleAuth = useCallback(
    async (action, payload) => {
      if (action === 'login') {
        await dispatch(loginThunk(payload));
      } else {
        await dispatch(registrationThunk(payload));
      }
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
          isSubmitting={authenticationIsFetching}
          onSubmit={({ email, password }) =>
            handleAuth('login', { email, password })
          }
        />
      ) : (
        <RegistrationForm
          isSubmitting={authenticationIsFetching}
          onSubmit={({ fullName, email, password }) =>
            handleAuth('registration', { fullName, email, password })
          }
        />
      )}

      <button
        className='auth-switch-button'
        onClick={() => {
          dispatch(clearAuthenticationStore());
          setIsLoginMode(!isLoginMode);
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
