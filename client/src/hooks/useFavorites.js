import { useEffect } from 'react';
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

export default function useFavorites(city, country, latitude, longitude) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFetching = useSelector(selectFavoritesIsFetching);
  const errorMessage = useSelector(selectFavoritesError);

  const cityExistsInFavorites = favorites.some(
    (favorite) =>
      favorite.latitude === latitude && favorite.longitude === longitude
  );

  const handleAddToFavorites = async () => {
    await dispatch(addToFavorites({ city, country, latitude, longitude }));
  };

  const handleRemoveFromFavorites = async () => {
    await dispatch(removeFromFavorites({ latitude, longitude }));
  };

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return {
    favorites,
    cityExistsInFavorites,
    isFetching,
    errorMessage,
    handleAddToFavorites,
    handleRemoveFromFavorites,
  };
}
