import { Navigate } from 'react-router-dom';

import useAuthUser from '../../hooks/useAuthUser';

function PublicRoute({ children }) {
  const { authenticatedUser } = useAuthUser();

  if (authenticatedUser) {
    return <Navigate replace to='/' />;
  }

  return children;
}

export default PublicRoute;
