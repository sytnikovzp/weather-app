import Logo from '../Logo/Logo';

import './FullScreenLoader.css';

function FullScreenLoader() {
  return (
    <div className='full-screen-loader'>
      <div className='loader-content'>
        <Logo />
        <div className='spinner' />
      </div>
    </div>
  );
}

export default FullScreenLoader;
