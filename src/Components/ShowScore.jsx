import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";

function ShowScore() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { score, totalQuestions, userName, region } = state || {};

  useEffect(() => {
    if (userName && typeof score === "number" && region) {
      const regionMap = {
        Africa: "Afrika",
        Americas: "Amerika",
        Asia: "Asien",
        Europe: "Europa",
        Oceania: "Oceanien",
        Afrika: "Afrika",
        Amerika: "Amerika",
        Asien: "Asien",
        Europa: "Europa",
        Oceanien: "Oceanien",
      };
      const regionSv = regionMap[region] || region;
      const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

      const findUser = leaderboard.find(
        (entry) =>
          entry.userName === userName &&
          entry.score === score &&
          entry.region === regionSv
      );

      // Spara bara om denna exakta entry inte redan finns
      if (!findUser) {
        const newEntry = {
          userName,
          score,
          region: regionSv,
        };
        leaderboard.push(newEntry);
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
      }
    }
  }, [userName, score, region]);

  if (!state) {
    return (
      <div>
        <Navbar />
        <h2>Det finns inget resultat att visa.</h2>
        <button onClick={() => navigate("/quizstart", { replace: true })}>
          Starta Quiz
        </button>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <h2>Grattis {userName}!</h2>
      <h3>Ditt Resultat</h3>
      <p>
        Poäng: {score} av {totalQuestions}
      </p>
      <button onClick={() => navigate("/leaderboard", { replace: true })}>
        Visa Topplistan
      </button>
      <button onClick={() => navigate("/quizstart", { replace: true })}>
        Starta om Quiz
      </button>
    </div>
  );
}

export default ShowScore;
