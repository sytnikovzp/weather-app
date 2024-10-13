import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// ==============================================================
import api from '../../api';

const HomePage = ({ setIsAuthenticated, isAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.get('/auth/logout');
      localStorage.removeItem('accessToken');
      setIsAuthenticated(false);
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
