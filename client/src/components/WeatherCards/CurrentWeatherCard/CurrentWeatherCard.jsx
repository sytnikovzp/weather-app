import {
  formatDateTime,
  getWindDirection,
} from '../../../utils/sharedFunctions';

import WhenUpdated from '../WhenUpdated/WhenUpdated';

import './CurrentWeatherCard.css';

function CurrentWeatherCard({ currentWeatherData, onRefresh, city, country }) {
  return (
    <div className='weather-content'>
      <WhenUpdated
        currentWeatherData={currentWeatherData}
        onRefresh={onRefresh}
      />
      <div className='city-info'>
        <h3>{country}</h3>
        <h3>{city}</h3>
        <h3>{Math.round(currentWeatherData.main.temp)}°C</h3>
      </div>
      <div className='weather-feels-like'>
        <p>
          Відчувається як {Math.round(currentWeatherData.main.feels_like)}°C
        </p>
        <p>
          {currentWeatherData.weather[0].description.charAt(0).toUpperCase() +
            currentWeatherData.weather[0].description.slice(1)}
        </p>
      </div>

      <div className='weather-details'>
        <div>
          <p>
            <strong>Видимість: </strong>
            {Math.round(currentWeatherData.visibility / 1000)} км
          </p>
          <p>
            <strong>Вологість:</strong> {currentWeatherData.main.humidity}%
          </p>
          <p>
            <strong>Схід сонця: </strong>
            {formatDateTime(currentWeatherData.sys.sunrise, 'HH:mm')}
          </p>
        </div>
        <div>
          <p>
            <strong>Вітер: </strong>
            {Math.round(currentWeatherData.wind.speed)} м/с
            {getWindDirection(currentWeatherData.wind.deg)}
          </p>
          <p>
            <strong>Облачність:</strong> {currentWeatherData.clouds.all}%
          </p>
          <p>
            <strong>Захід сонця: </strong>
            {formatDateTime(currentWeatherData.sys.sunset, 'HH:mm')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeatherCard;
