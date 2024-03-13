import Logout from "../Logout";
import "./Header.scss";

const Header = ({ setIsAuthenticated, setIsAdding }) => {
  return (
    <div>
      <h1>Your Dashboard</h1>
      <button onClick={() => setIsAdding(true)}>Add a book</button>
      <Logout setIsAuthenticated={setIsAuthenticated} />
    </div>
  );
};

export default Header;
