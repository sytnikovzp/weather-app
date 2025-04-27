import { useEffect, useState } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    }, 500);
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
    setQuery('');
    setSuggestions([]);
    onCitySelect(city);
  };

  const handleClearInput = () => {
    setQuery('');
    setSuggestions([]);
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
      {query && (
        <button className='clear-button' onClick={handleClearInput}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      )}

      {(isLoading || errorMessage || suggestions.length === 0) && query && (
        <ul className='autocomplete-list' id='autocomplete-list'>
          {isLoading && !suggestions.length && (
            <li className='autocomplete-item loading'>
              <BarLoader />
            </li>
          )}

          {errorMessage && !suggestions.length && (
            <li className='autocomplete-item error'>
              <ErrorMessageBlock message={errorMessage} />
            </li>
          )}

          {suggestions.length === 0 && !isLoading && !errorMessage && (
            <li className='autocomplete-item no-results'>Немає результатів</li>
          )}
        </ul>
      )}

      {suggestions.length > 0 && query && (
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
