import Welcome from '../Welcome/Welcome';

function Tabs({ activeTab, onTabClick }) {
  return (
    <div className='tabs-container'>
      <div
        className={`tab ${activeTab === 'main' ? 'active' : ''}`}
        onClick={() => onTabClick('main')}
      >
        Головна
      </div>
      <div
        className={`tab ${activeTab === 'favorites' ? 'active' : ''}`}
        onClick={() => onTabClick('favorites')}
      >
        Обране
      </div>
      <Welcome />
    </div>
  );
}

export default Tabs;
