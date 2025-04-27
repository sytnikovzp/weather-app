import weatherLogo from '../../assets/openweather.svg';
import './Logo.css';

function Logo() {
  return <img alt='Weather logo' className='logo' src={weatherLogo} />;
}

export default Logo;
