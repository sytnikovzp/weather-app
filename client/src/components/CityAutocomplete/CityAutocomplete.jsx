import { useState } from 'react';
import axios from 'axios';
// ==============================================================
import { WEATHER_API_KEY } from '../../constants';
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
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct`,
          {
            params: {
              q: searchTerm,
              limit: 10,
              appid: WEATHER_API_KEY,
            },
          }
        );

        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching city suggestions:', error);
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
        placeholder='Enter city name'
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
