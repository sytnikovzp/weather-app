import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useAuthentication from '../../hooks/useAuthentication';

import { logoutThunk } from '../../store/thunks/authenticationThunks';

import './Welcome.css';

function Welcome() {
  const { userProfile, isAuthenticated } = useAuthentication();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate('/auth');
  };

  return (
    <div className='welcome-block'>
      {isAuthenticated && <p>Привіт, {userProfile.name}!</p>}
      <button className='logout-button' onClick={handleLogout}>
        <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
    </div>
  );
}

export default Welcome;
