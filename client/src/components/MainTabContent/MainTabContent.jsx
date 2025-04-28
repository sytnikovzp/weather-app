import CityAutocomplete from '../CityAutocomplete/CityAutocomplete';
import TemperatureChart from '../TemperatureChart/TemperatureChart';
import WeatherCard from '../WeatherCard/WeatherCard';

import './MainTabContent.css';

function MainTabContent({
  errorMessageUserCity,
  isLoadingUserCity,
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
            isLoadingUserCity={isLoadingUserCity}
            selectedCity={selectedCity}
            setIsModalOpen={setIsModalOpen}
          />
          <TemperatureChart
            errorMessageUserCity={errorMessageUserCity}
            isLoadingUserCity={isLoadingUserCity}
            selectedCity={selectedCity}
          />
        </>
      )}
    </div>
  );
}

export default MainTabContent;
