import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function ShowScore({ score, totalQuestions, userName }) {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <h2>Grattis {userName}! Ditt Resultat</h2>
      <p>
        Poäng: {score} av {totalQuestions}
      </p>
      <button onClick={() => navigate("/leaderboard", { replace: true })}>
        Visa Leaderboard
      </button>
      <button onClick={() => navigate("/quizstart", { replace: true })}>
        Starta om Quiz
      </button>
    </div>
  );
}

export default ShowScore;
