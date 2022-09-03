import HomePage from "./routes/HomePage/HomePage.js";
import NavBar from "../src/components/NavBar/NavBar";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <NavBar />
      <HomePage />
    </div>
  );
}

export default App;
