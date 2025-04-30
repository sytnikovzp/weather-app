import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { ERROR_MESSAGES } from '../../constants';

import './NotFoundPage.css';

function NotFoundPage() {
  const navigate = useNavigate();

  const randomMessage =
    ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)];

  const handleNavigateToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className='not-found-container'>
      <h2 className='not-found-title'>Помилка 404</h2>
      <h4 className='not-found-message'>{randomMessage}</h4>
      <button type='button' onClick={handleNavigateToHome}>
        Повернутися на головну
      </button>
    </div>
  );
}

export default NotFoundPage;
