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
    try {
      await dispatch(addToFavorites({ city, country, latitude, longitude }));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      await dispatch(removeFromFavorites({ latitude, longitude }));
    } catch (error) {
      console.log(error.message);
    }
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
