import { useEffect, useState } from 'react';

import { weatherService } from '../../services';

import BarLoader from '../BarLoader/BarLoader';
import ErrorMessageBlock from '../ErrorMessageBlock/ErrorMessageBlock';

import './CityAutocomplete.css';

function CityAutocomplete({ onCitySelect }) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      const fetchSuggestions = async () => {
        setIsLoading(true);
        try {
          const citySuggestions =
            await weatherService.getCitySuggestions(debouncedQuery);
          setSuggestions(citySuggestions);
        } catch (errorMessage) {
          setErrorMessage(errorMessage.message);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  const handleInputChange = (event) => {
    setIsLoading(true);
    setErrorMessage(null);
    setQuery(event.target.value);
  };

  const handleCitySelect = (city) => {
    setQuery(city.name);
    setSuggestions([]);
    onCitySelect(city);
  };

  return (
    <div className='autocomplete-container'>
      <input
        aria-autocomplete='list'
        aria-controls='autocomplete-list'
        placeholder='Вкажіть назву міста...'
        type='text'
        value={query}
        onChange={handleInputChange}
      />

      {isLoading && !suggestions.length && <BarLoader />}
      {errorMessage && !suggestions.length && (
        <ErrorMessageBlock message={errorMessage} />
      )}

      {suggestions.length === 0 && !isLoading && !errorMessage && (
        <div className='no-results'>Немає результатів</div>
      )}

      {suggestions.length > 0 && (
        <ul className='autocomplete-list' id='autocomplete-list'>
          {suggestions.map((city) => (
            <li
              key={`${city.lat}-${city.lon}`}
              className='autocomplete-item'
              onClick={() => handleCitySelect(city)}
            >
              {city.name}, {city.state && `${city.state},`} {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CityAutocomplete;
