import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Styles/QuizStart.module.css";

const QuizStart = () => {
  const [region, setRegion] = useState("");
  const [userName, setUserName] = useState("");
  const { status } = useSelector((state) => state.quiz);
  const regions = ["Afrika", "Amerika", "Asien", "Europa", "Oceanien"];
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
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.title}>Starta Quiz</h1>
      <div className={styles.inputInfo}>
        <label>Användarnamn:</label>
        <input
          className={styles.inputField}
          type="text"
          placeholder="Användarnamn"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <select
          className={styles.selectRegion}
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
      </div>
      <button onClick={handleStartQuiz} className={styles.startButton}>
        {status === "loading" ? "Laddar..." : "Starta Quiz"}
      </button>
    </div>
  );
};

export default QuizStart;
