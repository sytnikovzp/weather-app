import { Navigate } from 'react-router-dom';

import useAuthentication from '../../hooks/useAuthentication';

function PublicRoute({ children }) {
  const { isAuthenticated, userProfileIsFetching } = useAuthentication();

  if (userProfileIsFetching) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate replace to='/' />;
  }

  return children;
}

export default PublicRoute;
