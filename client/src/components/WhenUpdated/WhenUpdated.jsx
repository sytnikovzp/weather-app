import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { formatDateTime } from '../../utils/sharedFunctions';

import BarLoader from '../BarLoader/BarLoader';

import './WhenUpdated.css';

function WhenUpdated({ isLoading, onRefresh, weatherData }) {
  const handleRefresh = (e) => {
    e.stopPropagation();
    onRefresh();
  };

  return (
    <div className='updated-info'>
      <div className='updated-text'>
        {isLoading ? (
          <BarLoader />
        ) : (
          <p>
            Оновлено: {formatDateTime(weatherData.dt, 'dd MMMM yyyy, HH:mm')}
          </p>
        )}
      </div>
      <button
        className='refresh-button'
        disabled={isLoading}
        onClick={handleRefresh}
      >
        <FontAwesomeIcon icon={faArrowsRotate} />
      </button>
    </div>
  );
}

export default WhenUpdated;
