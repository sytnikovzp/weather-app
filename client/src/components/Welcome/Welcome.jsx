import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import restController from '../../api/rest/restController';

import './Welcome.css';

function Welcome({ userProfile, setIsAuthenticated }) {
  const handleLogout = async () => {
    await restController.logout();
    setIsAuthenticated(false);
  };

  return (
    <div id='welcome'>
      {userProfile && <p>Привіт, {userProfile.fullName}!</p>}
      <button onClick={handleLogout}>
        <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
    </div>
  );
}

export default Welcome;
