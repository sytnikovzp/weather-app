import CityAutocomplete from '../CityAutocomplete/CityAutocomplete';
import TemperatureChart from '../TemperatureChart/TemperatureChart';
import WeatherBigCard from '../WeatherBigCard/WeatherBigCard';

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
          <WeatherBigCard
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
