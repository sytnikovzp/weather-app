import { useEffect, useState } from 'react';

import { getAccessToken } from '../utils/sharedFunctions';

import { userProfileService } from '../services';

function useAuthUser() {
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const fetchAuthenticatedUser = async () => {
    try {
      const user = await userProfileService.getUserProfile();
      setAuthenticatedUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error.message);
      setIsAuthenticated(false);
    } finally {
      setIsFetchingUser(false);
    }
  };

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      fetchAuthenticatedUser();
    } else {
      setIsFetchingUser(false);
    }
  }, []);

  return {
    isFetchingUser,
    isAuthenticated,
    authenticatedUser,
    setIsAuthenticated,
    fetchAuthenticatedUser,
  };
}

export default useAuthUser;
