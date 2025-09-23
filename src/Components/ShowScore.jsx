import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";

function ShowScore() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { score, totalQuestions, userName } = state || {};

  useEffect(() => {
    if (userName && typeof score === "number") {
      const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
      leaderboard.push({ userName, score });
      localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    }
  }, [userName, score]);

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
      <h2>Grattis {userName}! Ditt Resultat</h2>
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
