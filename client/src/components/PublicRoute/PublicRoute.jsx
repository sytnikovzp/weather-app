import { Navigate } from 'react-router-dom';

import useAuthUser from '../../hooks/useAuthUser';

import SplashScreen from '../../pages/SplashScreen/SplashScreen';

function PublicRoute({ children }) {
  const { authenticatedUser, isFetchingUser } = useAuthUser();

  if (isFetchingUser) {
    return <SplashScreen />;
  }

  if (authenticatedUser) {
    return <Navigate replace to='/' />;
  }

  return children;
}

export default PublicRoute;
