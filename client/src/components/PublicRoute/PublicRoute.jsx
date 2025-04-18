import { Navigate } from 'react-router-dom';

function PublicRoute({ children, isAuthenticated }) {
  if (isAuthenticated) {
    return <Navigate replace to='/' />;
  }

  return children;
}

export default PublicRoute;
