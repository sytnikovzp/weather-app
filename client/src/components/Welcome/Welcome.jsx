import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useAuthUser from '../../hooks/useAuthUser';

import { logoutThunk } from '../../store/thunks/authThunks';

import './Welcome.css';

function Welcome() {
  const { authenticatedUser } = useAuthUser();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutThunk()).unwrap();
    navigate('/auth');
  };

  return (
    <div id='welcome'>
      {authenticatedUser && <p>Привіт, {authenticatedUser.fullName}!</p>}
      <button onClick={handleLogout}>
        <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
    </div>
  );
}

export default Welcome;
