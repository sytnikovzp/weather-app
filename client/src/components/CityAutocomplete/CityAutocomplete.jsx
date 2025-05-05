import { useCallback, useEffect, useState } from 'react';

import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { weatherService } from '../../services';

import ErrorMessageBlock from '../ErrorMessageBlock/ErrorMessageBlock';
import BarLoader from '../Loaders/BarLoader/BarLoader';
import SuggestionItem from '../SuggestionItem/SuggestionItem';

import { autocompleteInputStyle } from '../../styles';
import './CityAutocomplete.css';

function CityAutocomplete({ onCitySelect }) {
  const [query, setQuery] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
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
        setIsFetching(true);
        try {
          const citySuggestions =
            await weatherService.getCitySuggestions(debouncedQuery);
          setSuggestions(citySuggestions);
        } catch (error) {
          setError(error.message);
          setSuggestions([]);
        } finally {
          setIsFetching(false);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  const handleInputChange = useCallback((event) => {
    setIsFetching(true);
    setError(null);
    setQuery(event.target.value);
  }, []);

  const handleClearInput = useCallback(() => {
    setQuery('');
    setSuggestions([]);
  }, []);

  const handleCitySelect = useCallback(
    (city) => {
      setQuery('');
      setSuggestions([]);
      onCitySelect(city);
    },
    [onCitySelect]
  );

  return (
    <div className='autocomplete-container'>
      <div className='input-wrapper'>
        <FontAwesomeIcon className='search-icon' icon={faSearch} />
        <input
          aria-autocomplete='list'
          aria-controls='autocomplete-list'
          placeholder='Вкажіть назву міста...'
          style={autocompleteInputStyle}
          type='text'
          value={query}
          onChange={handleInputChange}
        />
        {query && (
          <button
            className='clear-button'
            type='button'
            onClick={handleClearInput}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
      </div>

      {query && (
        <ul className='autocomplete-list' id='autocomplete-list'>
          {isFetching && (
            <li className='autocomplete-item loading'>
              <BarLoader />
            </li>
          )}

          {error && !isFetching && (
            <li className='autocomplete-item error'>
              <ErrorMessageBlock message={error} />
            </li>
          )}

          {!isFetching && !error && suggestions.length === 0 && (
            <li className='autocomplete-item no-results'>Немає результатів</li>
          )}

          {!isFetching &&
            !error &&
            suggestions.length > 0 &&
            suggestions.map((city) => (
              <SuggestionItem
                key={`${city.lat}-${city.lon}`}
                city={city}
                onSelect={handleCitySelect}
              />
            ))}
        </ul>
      )}
    </div>
  );
}

export default CityAutocomplete;
