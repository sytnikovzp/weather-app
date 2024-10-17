import './ModalWindow.css'; 

const ModalWindow = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h3>{title}</h3>
        <p>{message}</p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default ModalWindow;
