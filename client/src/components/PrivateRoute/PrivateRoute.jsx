import { Navigate } from 'react-router-dom';

import useAuthUser from '../../hooks/useAuthUser';

import SplashScreen from '../../pages/SplashScreen/SplashScreen';

function PrivateRoute({ children }) {
  const { authenticatedUser, isFetchingUser } = useAuthUser();

  if (isFetchingUser) {
    return <SplashScreen />;
  }

  if (!authenticatedUser) {
    return <Navigate replace to='/auth' />;
  }

  return children;
}

export default PrivateRoute;
