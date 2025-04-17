import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { formatDateTime } from '../../utils/sharedFunctions';

import Preloader from '../Preloader/Preloader';

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
          <Preloader />
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
