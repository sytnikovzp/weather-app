import Logo from '../../components/Logo/Logo';

import './SplashScreen.css';

function SplashScreen() {
  return (
    <div className='splash-screen'>
      <div className='splash-content'>
        <Logo />
        <div className='spinner' />
      </div>
    </div>
  );
}

export default SplashScreen;
