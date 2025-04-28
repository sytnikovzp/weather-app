import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { formatDateTime } from '../../../utils/sharedFunctions';

import './WhenUpdated.css';

function WhenUpdated({ onRefresh, currentWeatherData }) {
  const handleRefresh = () => {
    onRefresh();
  };

  return (
    <div className='updated-info'>
      <div className='updated-text'>
        <p>
          <strong>Оновлено: </strong>
          {formatDateTime(currentWeatherData.dt, 'dd MMMM yyyy, HH:mm')}
        </p>
      </div>
      <button className='refresh-button' onClick={handleRefresh}>
        <FontAwesomeIcon icon={faArrowsRotate} />
      </button>
    </div>
  );
}

export default WhenUpdated;
