import { getDayLabel } from '../../../utils/sharedFunctions';

import ErrorMessageBlock from '../../ErrorMessageBlock/ErrorMessageBlock';

import './WeeklyForecastCard.css';

function WeeklyForecastCard({ weeklyWeatherData }) {
  const labels = weeklyWeatherData?.labels || [];
  const temperatures = weeklyWeatherData?.datasets?.[0]?.data || [];

  if (labels.length === 0 || temperatures.length === 0) {
    return <ErrorMessageBlock message={'Немає даних для прогнозу'} />;
  }

  return (
    <div className='weekly-forecast'>
      {labels.map((_, index) => {
        const dayLabel = getDayLabel(index);
        const temperature = temperatures[index];

        return (
          <div key={index} className='weekly-item'>
            <p className='day-label'>{dayLabel}</p>
            <p>{temperature}°C</p>
          </div>
        );
      })}
    </div>
  );
}

export default WeeklyForecastCard;
