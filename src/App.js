import "./App.scss";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem("is_authenticated")));
  }, []);

  return (
    <div className="App">
      <h1>BookWarm</h1>
      {isAuthenticated ? (
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
}

export default App;
