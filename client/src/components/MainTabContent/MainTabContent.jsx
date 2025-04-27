import CityAutocomplete from '../CityAutocomplete/CityAutocomplete';
import ErrorMessageBlock from '../ErrorMessageBlock/ErrorMessageBlock';
import SpinerLoader from '../SpinerLoader/SpinerLoader';
import TemperatureChart from '../TemperatureChart/TemperatureChart';
import WeatherCard from '../WeatherCard/WeatherCard';

function MainTabContent({
  errorMessage,
  isLoading,
  selectedCity,
  setIsModalOpen,
  onCitySelect,
}) {
  const isCitySelected = Boolean(selectedCity);

  return (
    <div className='content'>
      <CityAutocomplete onCitySelect={onCitySelect} />
      {isLoading && <SpinerLoader />}
      {errorMessage && (
        <div className='error-big-container'>
          <ErrorMessageBlock message={errorMessage} />
        </div>
      )}
      {isCitySelected && !isLoading && !errorMessage && (
        <>
          <WeatherCard
            selectedCity={selectedCity}
            setIsModalOpen={setIsModalOpen}
          />
          <TemperatureChart selectedCity={selectedCity} />
        </>
      )}
    </div>
  );
}

export default MainTabContent;
