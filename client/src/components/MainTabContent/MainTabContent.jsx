import CityAutocomplete from '../CityAutocomplete/CityAutocomplete';
import TemperatureChart from '../WeatherCards/TemperatureChart/TemperatureChart';
import WeatherCard from '../WeatherCards/WeatherCard/WeatherCard';

import './MainTabContent.css';

function MainTabContent({
  errorMessageUserCity,
  isFetchingUserCity,
  selectedCity,
  onCitySelect,
}) {
  const isCitySelected = Boolean(selectedCity);

  return (
    <div className='content'>
      <CityAutocomplete onCitySelect={onCitySelect} />

      {isCitySelected && (
        <>
          <WeatherCard
            errorMessageUserCity={errorMessageUserCity}
            isFetchingUserCity={isFetchingUserCity}
            selectedCity={selectedCity}
          />
          <TemperatureChart
            errorMessageUserCity={errorMessageUserCity}
            isFetchingUserCity={isFetchingUserCity}
            selectedCity={selectedCity}
          />
        </>
      )}
    </div>
  );
}

export default MainTabContent;
