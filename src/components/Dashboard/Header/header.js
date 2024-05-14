import Logout from "../../Logout/logout";
import "./header.scss";

const Header = ({ setIsAuthenticated, setIsAdding, userName }) => {
  return (
    <div className="header-container">
      <h1>Welcome, {userName}!</h1>
      <div className="header-action-buttons">
        <button className="header-add-button" onClick={() => setIsAdding(true)}>
          Add a book
        </button>
        <Logout
          className="header-logout-button"
          setIsAuthenticated={setIsAuthenticated}
        />
      </div>
    </div>
  );
};

export default Header;
