import "./App.scss";
import { useEffect, useState } from "react";
import Login from "./components/Login/login";
import Dashboard from "./components/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem("is_authenticated")));
  }, []);

  return (
    <div className="App">
      {isAuthenticated ? (
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
}

export default App;
