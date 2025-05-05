import { useCallback } from 'react';

import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { formatDateTime } from '../../../utils/sharedFunctions';

import './WhenUpdated.css';

function WhenUpdated({ onWeatherRefresh, currentWeatherData }) {
  const formattedDate = currentWeatherData?.dt
    ? formatDateTime(currentWeatherData.dt, 'dd MMMM yyyy, HH:mm')
    : 'Невідомо';

  const onRefresh = useCallback(() => {
    onWeatherRefresh();
  }, [onWeatherRefresh]);

  return (
    <div className='updated-info'>
      <div className='updated-text'>
        <p>
          <strong>Оновлено: </strong>
          {formattedDate}
        </p>
      </div>
      <button className='refresh-button' type='button' onClick={onRefresh}>
        <FontAwesomeIcon icon={faArrowsRotate} />
      </button>
    </div>
  );
}

export default WhenUpdated;
