import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useState } from "react";

const QuizStart = () => {
  const [region, setRegion] = useState("");
  const [namn, setNamn] = useState("");
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (!region || !namn) {
      alert("Vänligen välj en region och ange ditt namn.");
      return;
    }
    navigate("/quiz", { state: { region, namn } });
  };

  return (
    <div>
      <Navbar />
      <h1>Starta Quiz</h1>
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
      <p>Ange ett användarnamn:</p>
      <input
        type="text"
        placeholder="Användarnamn"
        value={namn}
        onChange={(e) => setNamn(e.target.value)}
      />
      <br />
      <button onClick={handleStartQuiz}>Starta Quiz</button>
    </div>
  );
};

export default QuizStart;
