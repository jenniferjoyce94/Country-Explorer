import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Countries from "./Pages/Countries";
import Collection from "./Pages/Collection";
import Quiz from "./Pages/Quiz";
import Leaderboard from "./Pages/Leaderboard";
import CountryDetails from "./Pages/CountryDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<Countries />} />
          <Route
            path="/countryDetails/:countryName"
            element={<CountryDetails />}
          />
          <Route path="/collection" element={<Collection />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
