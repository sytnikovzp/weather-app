import { Navigate } from 'react-router-dom';

import useAuthUser from '../../hooks/useAuthUser';

function PrivateRoute({ children }) {
  const { authenticatedUser } = useAuthUser();

  if (!authenticatedUser) {
    return <Navigate replace to='/auth' />;
  }

  return children;
}

export default PrivateRoute;
