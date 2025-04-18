import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useAuthUser from '../../hooks/useAuthUser';

import { authService } from '../../services';

import './Welcome.css';

function Welcome() {
  const { authenticatedUser, setIsAuthenticated } = useAuthUser();

  const handleLogout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
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
