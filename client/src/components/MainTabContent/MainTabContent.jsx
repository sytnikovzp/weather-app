import CityAutocomplete from '../CityAutocomplete/CityAutocomplete';
import TemperatureChart from '../TemperatureChart/TemperatureChart';
import WeatherCard from '../WeatherCard/WeatherCard';

import './MainTabContent.css';

function MainTabContent({
  errorMessageUserCity,
  isFetchingUserCity,
  selectedCity,
  setIsModalOpen,
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
            setIsModalOpen={setIsModalOpen}
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
