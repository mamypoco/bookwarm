import './App.scss';
import { useEffect, useState } from 'react';
import Login from './components/Login/login';
import Dashboard from './components/Dashboard/dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  //   const [isCardModalActive, setIsCardModalActive] = useState(false); //moved state up from List.

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
  }, []);

  //for cardModal components state management
  //   const openModal = () => setIsCardModalActive(true);
  //   const closeModal = () => setIsCardModalActive(false);

  return (
    <div className="App">
      {isAuthenticated ? (
        <Dashboard
          setIsAuthenticated={setIsAuthenticated}
          //  setIsCardModalActive={setIsCardModalActive}
          //  isCardModalActive={isCardModalActive}
          //  openModal={openModal}
          //  closeModal={closeModal}
        />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
}

export default App;
