import './Preloader.css';

function Preloader({ message = 'Завантаження...' }) {
  return (
    <div className='loader'>
      <div className='horizontal-loader'></div>
      <p>{message}</p>
    </div>
  );
}

export default Preloader;
