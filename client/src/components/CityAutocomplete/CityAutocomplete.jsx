import { useState } from 'react';
// ==============================================================
import { fetchCitySuggestions } from '../../api';
// ==============================================================
import './CityAutocomplete.css';

const CityAutocomplete = ({ onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);

    if (searchTerm.length > 2) {
      try {
        const citySuggestions = await fetchCitySuggestions(searchTerm);
        setSuggestions(citySuggestions);
      } catch (error) {
        console.log('Error fetching city suggestions:', error);
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
        type='text'
        className='autocomplete-input'
        value={query}
        onChange={handleInputChange}
        placeholder='Введіть назву міста'
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
};

export default CityAutocomplete;
