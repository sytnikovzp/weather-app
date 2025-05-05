import { useCallback } from 'react';

function SuggestionItem({ city, onSelect }) {
  const handleClick = useCallback(() => {
    onSelect(city);
  }, [city, onSelect]);

  return (
    <li className='autocomplete-item' onClick={handleClick}>
      {city.name}, {city.state && `${city.state},`} {city.country}
    </li>
  );
}

export default SuggestionItem;
