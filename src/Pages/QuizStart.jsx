import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useState } from "react";
import { useSelector } from "react-redux";

const QuizStart = () => {
  const [region, setRegion] = useState("");
  const [userName, setUserName] = useState("");
  const { status } = useSelector((state) => state.quiz);
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  const navigate = useNavigate();

  const handleStartQuiz = (e) => {
    e.preventDefault();
    if (!region || !userName) {
      alert("Vänligen välj en region och ange ditt namn.");
      return;
    }
    navigate("/quizgame", { state: { region, userName } });
  };

  return (
    <div>
      <Navbar />
      <h1>Starta Quiz</h1>
      <div>
        <label>Användarnamn:</label>
        <input
          type="text"
          placeholder="Användarnamn"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <select
        name="countries"
        id="countries"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      >
        <option value="">Välj ett Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      <button onClick={handleStartQuiz}>
        {status === "loading" ? "Laddar..." : "Starta Quiz"}
      </button>
    </div>
  );
};

export default QuizStart;
