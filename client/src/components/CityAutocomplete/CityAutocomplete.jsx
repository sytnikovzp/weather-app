import { useState } from 'react';

import restController from '../../api/rest/restController';

import './CityAutocomplete.css';

function CityAutocomplete({ onCitySelect }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);
    if (searchTerm.length > 2) {
      try {
        const citySuggestions =
          await restController.fetchCitySuggestions(searchTerm);
        setSuggestions(citySuggestions);
      } catch (error) {
        console.error('Помилка отримання пропозицій міст: ', error.message);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleCitySelect = (city) => {
    setQuery(city.name);
    setSuggestions([]);
    onCitySelect(city);
  };

  return (
    <div className='autocomplete-container'>
      <input
        className='autocomplete-input'
        placeholder='Вкажіть назву міста'
        type='text'
        value={query}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <ul className='autocomplete-list'>
          {suggestions.map((city, index) => (
            <li
              key={index}
              className='autocomplete-item'
              onClick={() => handleCitySelect(city)}
            >
              {city.name}, {city.state}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CityAutocomplete;
