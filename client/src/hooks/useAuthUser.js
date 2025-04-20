import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAccessToken } from '../utils/sharedFunctions';

import { selectIsAuthenticated } from '../store/selectors/authSelectors';
import {
  selectUserProfile,
  selectUserProfileIsLoading,
} from '../store/selectors/userProfileSelectors';
import { getUserProfile } from '../store/thunks/userProfileThunks';

function useAuthUser() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isFetchingUser = useSelector(selectUserProfileIsLoading);
  const authenticatedUser = useSelector(selectUserProfile);

  useEffect(() => {
    const token = getAccessToken();
    if (token && !authenticatedUser && !isFetchingUser) {
      dispatch(getUserProfile());
    }
  }, [dispatch, authenticatedUser, isFetchingUser]);

  return { isAuthenticated, isFetchingUser, authenticatedUser };
}

export default useAuthUser;
