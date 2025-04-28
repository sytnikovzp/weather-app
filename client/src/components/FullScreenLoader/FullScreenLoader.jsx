import BarLoader from '../Loaders/BarLoader/BarLoader';
import Logo from '../Logo/Logo';

import './FullScreenLoader.css';

function FullScreenLoader() {
  return (
    <div className='full-screen-loader'>
      <div className='loader-content'>
        <Logo />
        <BarLoader />
      </div>
    </div>
  );
}

export default FullScreenLoader;
