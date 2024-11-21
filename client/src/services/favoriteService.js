import { favoritesRest } from '../api/rest';

const fetchFavorites = async () => {
  try {
    const data = await favoritesRest.fetchFavoriteCities();
    return data;
  } catch (error) {
    console.error('Помилка завантаження списку обраних міст:', error.message);
    throw new Error('Помилка завантаження списку обраних міст');
  }
};

export { fetchFavorites };
