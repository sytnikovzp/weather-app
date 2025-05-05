import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectFavorites,
  selectFavoritesError,
  selectFavoritesIsFetching,
} from '../store/selectors/favoritesSelectors';
import {
  addToFavorites,
  fetchFavorites,
  removeFromFavorites,
} from '../store/thunks/favoritesThunks';

function useFavorites(city, countryCode, latitude, longitude) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFetching = useSelector(selectFavoritesIsFetching);
  const error = useSelector(selectFavoritesError);

  const isCityInFavorites = favorites.some(
    (favorite) =>
      favorite.latitude === latitude && favorite.longitude === longitude
  );

  const handleAddToFavorites = useCallback(async () => {
    await dispatch(addToFavorites({ city, countryCode, latitude, longitude }));
  }, [dispatch, city, countryCode, latitude, longitude]);

  const handleRemoveFromFavorites = useCallback(async () => {
    await dispatch(removeFromFavorites({ latitude, longitude }));
  }, [dispatch, latitude, longitude]);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return {
    favorites,
    isCityInFavorites,
    isFetching,
    error,
    handleAddToFavorites,
    handleRemoveFromFavorites,
  };
}

export default useFavorites;
