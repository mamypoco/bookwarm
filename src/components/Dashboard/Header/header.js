import Logout from '../../Logout/logout';
import './header.scss';

const Header = ({
  setIsAuthenticated,
  setIsAdding,
  userName,
  isCardModalActive,
}) => {
  return (
    <div
      className={
        isCardModalActive ? 'hide-header-container' : 'header-container'
      }
    >
      <h1>Welcome, {userName}!</h1>
      <div className="header-action-buttons">
        <button
          className="header-add-button"
          onClick={() => setIsAdding(true)}
          disabled={isCardModalActive}
        >
          Add a book
        </button>
        <Logout
          className="header-logout-button"
          setIsAuthenticated={setIsAuthenticated}
          isDisabled={isCardModalActive}
          disabled={isCardModalActive}
        />
      </div>
    </div>
  );
};

export default Header;
