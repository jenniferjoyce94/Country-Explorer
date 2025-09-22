import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

function ShowScore() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { score, totalQuestions, userName } = state || {};

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
        Visa Leaderboard
      </button>
      <button onClick={() => navigate("/quizstart", { replace: true })}>
        Starta om Quiz
      </button>
    </div>
  );
}

export default ShowScore;
