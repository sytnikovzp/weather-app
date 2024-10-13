import { useState } from 'react';
// ==============================================================
import LoginForm from '../../components/LoginForm/LoginForm';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import './AuthPage.css';

const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleLogin = (email, password) => {
    console.log('Login:', { email, password });
  };

  const handleRegister = (fullName, email, password) => {
    console.log('Register:', { fullName, email, password });
  };

  return (
    <div className='container'>
      {isLoginMode ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <RegistrationForm onRegister={handleRegister} />
      )}
      <button
        id='switch-button'
        onClick={() => setIsLoginMode(!isLoginMode)}
      >
        Switch to {isLoginMode ? 'Register' : 'Login'}
      </button>
    </div>
  );
};

export default AuthPage;
