import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const HomePage = ({ setIsAuthenticated, isAuthenticated }) => {
  const [userProfile, setUserProfile] = useState(null);
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
    } else {
      const fetchUserProfile = async () => {
        try {
          const response = await api.get('/auth/profile');
          setUserProfile(response.data);
        } catch (error) {
          console.log('Error fetching user profile:', error);
        }
      };
      fetchUserProfile();
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h1>Home Page</h1>
      {userProfile && <p>Hi, {userProfile.fullName}!</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
