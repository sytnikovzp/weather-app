import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import useAuthUser from './hooks/useAuthUser';

import Layout from './components/Layout/Layout';
import Preloader from './components/Preloader/Preloader';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import AuthPage from './pages/AuthPage/AuthPage';
import HomePage from './pages/HomePage/HomePage';

import './App.css';

function App() {
  const { isFetchingUser, isAuthenticated } = useAuthUser();

  if (isFetchingUser) {
    return <Preloader />;
  }

  return (
    <Router>
      <Routes>
        <Route element={<Layout />} path='/'>
          <Route
            index
            element={
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                isFetchingUser={isFetchingUser}
              >
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            element={
              isAuthenticated ? <Navigate replace to='/' /> : <AuthPage />
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
