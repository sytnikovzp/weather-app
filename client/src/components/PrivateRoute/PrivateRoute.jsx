import { Navigate } from 'react-router-dom';

import useAuthentication from '../../hooks/useAuthentication';

import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';

function PrivateRoute({ children }) {
  const { isAuthenticated, userProfileIsFetching } = useAuthentication();

  if (userProfileIsFetching) {
    return <FullScreenLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate replace to='/auth' />;
  }

  return children;
}

export default PrivateRoute;
