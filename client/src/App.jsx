import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
// ==============================================================
import restController from './api/rest/restController';
import { getAccessToken } from './utils/sharedFunctions';
// ==============================================================
import Preloader from './components/Preloader/Preloader';
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
// ==============================================================
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const checkAuthentication = async () => {
    try {
      const userProfile = await restController.fetchUserProfile();
      setUserProfile(userProfile);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Не вдалося завантажити дані користувача:', error.message);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      checkAuthentication();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <Preloader />;

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <HomePage
                  setIsAuthenticated={setIsAuthenticated}
                  userProfile={userProfile}
                />
              </PrivateRoute>
            }
          />
          <Route
            path='auth/*'
            element={
              isAuthenticated ? (
                <Navigate to='/' replace />
              ) : (
                <AuthPage checkAuthentication={checkAuthentication} />
              )
            }
          />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
