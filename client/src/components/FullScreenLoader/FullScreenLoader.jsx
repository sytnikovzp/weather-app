import SpinerLoader from '../SpinerLoader/SpinerLoader';

import './FullScreenLoader.css';

function FullScreenLoader() {
  return (
    <div className='full-screen-loader'>
      <div className='loader-content'>
        <SpinerLoader />
      </div>
    </div>
  );
}

export default FullScreenLoader;
