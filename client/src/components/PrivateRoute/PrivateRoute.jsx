import { Navigate } from 'react-router-dom';

import useAuthentication from '../../hooks/useAuthentication';

function PrivateRoute({ children }) {
  const { isAuthenticated, userProfileIsFetching } = useAuthentication();

  if (userProfileIsFetching) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate replace to='/auth' />;
  }

  return children;
}

export default PrivateRoute;
