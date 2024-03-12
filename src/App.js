import "./App.scss";
import { Auth } from "./components/auth/Auth";
import { Dashboard } from "./pages/dashboard/Dashboard";

function App() {

  return (
    <div className="App">
      <h1>BookWarm Log</h1>
      <Auth />
      <Dashboard />
    </div>
  );
}

export default App;
