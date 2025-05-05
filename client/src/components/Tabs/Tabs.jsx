import { useCallback } from 'react';

import './Tabs.css';

function Tabs({ activeTab, onTabClick }) {
  const handleMainClick = useCallback(() => {
    onTabClick('main');
  }, [onTabClick]);

  const handleFavoritesClick = useCallback(() => {
    onTabClick('favorites');
  }, [onTabClick]);

  return (
    <div className='tabs-container'>
      <div
        className={`tab ${activeTab === 'main' ? 'active' : ''}`}
        onClick={handleMainClick}
      >
        Головна
      </div>
      <div
        className={`tab ${activeTab === 'favorites' ? 'active' : ''}`}
        onClick={handleFavoritesClick}
      >
        Обране
      </div>
    </div>
  );
}

export default Tabs;
