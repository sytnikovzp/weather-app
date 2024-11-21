import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to='/auth' replace />;
}

export default PrivateRoute;
