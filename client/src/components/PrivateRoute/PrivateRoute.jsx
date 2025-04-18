import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate replace to='/auth' />;
  }

  return children;
}

export default PrivateRoute;
