import { getDayLabel } from '../../../utils/sharedFunctions';

import './WeeklyForecastCard.css';

function WeeklyForecastCard({ weeklyWeatherData }) {
  return (
    <div className='weekly-forecast'>
      {weeklyWeatherData.labels.map((_, index) => (
        <div key={index} className='weekly-item'>
          <p className='day-label'>{getDayLabel(index)}</p>
          <p>{weeklyWeatherData.datasets[0].data[index]}°C</p>
        </div>
      ))}
    </div>
  );
}

export default WeeklyForecastCard;
