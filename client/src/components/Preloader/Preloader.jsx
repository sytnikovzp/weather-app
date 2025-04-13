import './Preloader.css';

function Preloader({ message = 'Завантаження...' }) {
  return (
    <div className='loader'>
      <div className='horizontal-loader' />
      <p>{message}</p>
    </div>
  );
}

export default Preloader;
