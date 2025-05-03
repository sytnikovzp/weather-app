/* eslint-disable camelcase */
import {
  formatDateTime,
  getWindDirection,
} from '../../../utils/sharedFunctions';

import WeatherDetail from '../WeatherDetail/WeatherDetail';
import WhenUpdated from '../WhenUpdated/WhenUpdated';

import './CurrentWeatherCard.css';

function CurrentWeatherCard({
  currentWeatherData,
  onWeatherRefresh,
  onForecastRefresh,
  city,
  countryCode,
}) {
  if (!currentWeatherData) {
    return null;
  }

  const {
    main: { temp, feels_like, humidity },
    weather,
    visibility,
    sys: { sunrise, sunset },
    wind: { speed, deg },
    clouds: { all: cloudiness },
  } = currentWeatherData;

  const description =
    weather[0].description.charAt(0).toUpperCase() +
    weather[0].description.slice(1);

  return (
    <div className='weather-content'>
      <WhenUpdated
        currentWeatherData={currentWeatherData}
        onForecastRefresh={onForecastRefresh}
        onWeatherRefresh={onWeatherRefresh}
      />
      <div className='city-info'>
        <h3>{countryCode}</h3>
        <h3>{city}</h3>
        <h3>{Math.round(temp)}°C</h3>
      </div>
      <div className='weather-feels-like'>
        <p>Відчувається як {Math.round(feels_like)}°C</p>
        <p>{description}</p>
      </div>

      <div className='weather-details'>
        <div>
          <WeatherDetail
            label='Видимість:'
            value={`${Math.round(visibility / 1000)} км`}
          />
          <WeatherDetail label='Вологість:' value={`${humidity}%`} />
          <WeatherDetail
            label='Схід сонця:'
            value={formatDateTime(sunrise, 'HH:mm')}
          />
        </div>
        <div>
          <WeatherDetail
            label='Вітер:'
            value={`${Math.round(speed)} м/с ${getWindDirection(deg)}`}
          />
          <WeatherDetail label='Облачність:' value={`${cloudiness}%`} />
          <WeatherDetail
            label='Захід сонця:'
            value={formatDateTime(sunset, 'HH:mm')}
          />
        </div>
      </div>
    </div>
  );
}

export default CurrentWeatherCard;
