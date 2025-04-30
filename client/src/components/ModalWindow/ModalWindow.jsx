import { useEffect, useRef } from 'react';

import './ModalWindow.css';

function ModalWindow({ isOpen, onClose, title, message }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-modal='true'
      className={`modal ${isOpen ? 'open' : ''}`}
      role='dialog'
    >
      <div className='modal-content'>
        <h3>{title}</h3>
        <p>{message}</p>
        <button ref={closeButtonRef} type='button' onClick={onClose}>
          Закрити
        </button>
      </div>
    </div>
  );
}

export default ModalWindow;
