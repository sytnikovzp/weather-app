import Tabs from '../Tabs/Tabs';
import Welcome from '../Welcome/Welcome';

import './Header.css';

function Header({ activeTab, onTabClick }) {
  return (
    <header className='header'>
      <Tabs activeTab={activeTab} onTabClick={onTabClick} />
      <Welcome />
    </header>
  );
}

export default Header;
