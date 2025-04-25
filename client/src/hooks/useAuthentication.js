import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAccessToken } from '../utils/sharedFunctions';

import {
  selectIsAuthenticated,
  selectUserProfile,
  selectUserProfileError,
  selectUserProfileIsFetching,
} from '../store/selectors/userProfileSelectors';
import { logoutThunk } from '../store/thunks/authenticationThunks';
import { fetchUserProfile } from '../store/thunks/userProfileThunks';

function useAuthentication() {
  const dispatch = useDispatch();

  const userProfileIsFetching = useSelector(selectUserProfileIsFetching);
  const userProfileError = useSelector(selectUserProfileError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userProfile = useSelector(selectUserProfile);

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      return;
    }

    const initialize = async () => {
      if (userProfileError) {
        await dispatch(logoutThunk());
        return;
      }

      if (!userProfile && !userProfileIsFetching) {
        await dispatch(fetchUserProfile());
      }
    };

    initialize();
  }, [dispatch, userProfile, userProfileIsFetching, userProfileError]);

  return { userProfile, isAuthenticated, userProfileIsFetching };
}

export default useAuthentication;
