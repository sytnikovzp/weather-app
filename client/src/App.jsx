import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { getAccessToken } from './utils/sharedFunctions';
import restController from './api/rest/restController';

import Layout from './components/Layout/Layout';
import Preloader from './components/Preloader/Preloader';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import AuthPage from './pages/AuthPage/AuthPage';
import HomePage from './pages/HomePage/HomePage';

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
      console.error('Не вдалося завантажити дані користувача: ', error.message);
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

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <Router>
      <Routes>
        <Route element={<Layout />} path='/'>
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
            element={
              isAuthenticated ? (
                <Navigate replace to='/' />
              ) : (
                <AuthPage checkAuthentication={checkAuthentication} />
              )
            }
            path='auth/*'
          />
          <Route element={<Navigate replace to='/' />} path='*' />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
