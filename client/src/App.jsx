import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';

import AuthPage from './pages/Auth/AuthPage';
import HomePage from './pages/Home/HomePage';
import NotFoundPage from './pages/NotFound/NotFoundPage';

import './App.css';

const publicRoutes = [{ path: 'auth', element: AuthPage }];
const privateRoutes = [{ path: '/', element: HomePage }];

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />} path='/'>
          {publicRoutes.map(({ path, element: Component }) => (
            <Route
              key={path}
              element={
                <PublicRoute>
                  <Component />
                </PublicRoute>
              }
              path={path}
            />
          ))}
          {privateRoutes.map(({ path, element: Component }) => (
            <Route
              key={path}
              element={
                <PrivateRoute>
                  <Component />
                </PrivateRoute>
              }
              path={path}
            />
          ))}
          <Route element={<NotFoundPage />} path='*' />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
