import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { current } from "@reduxjs/toolkit";
import { useState } from "react";
import { useEffect } from "react";

function QuizGame() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { region, namn } = state || {};

  const [countries, setCountries] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [current, setCurrent] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(15);
  const [showScore, setShowScore] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    if (!region || !namn) {
      navigate("/");
      return;
    }
    fetch(`https://restcountries.com/v3.1/region/${region}`)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        const randomQuestion = () => {
          const randomIndex = Math.floor(Math.random() * data.length);
          return data[randomIndex];
        };
        setCurrentQuestion(randomQuestion());
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userAnswer) return;

    if (
      userAnswer.toLowerCase().trim() ===
      currentQuestion[current].name.common.toLowerCase()
    ) {
      setScore(score + 1);
      alert("Rätt svar!");
    } else {
      alert(`Fel svar! Rätt svar är ${currentQuestion[current].name.common}.`);
    }
    setUserAnswer("");
    if (current - 1 < totalQuestions) {
      setCurrent(current + 1);
      setCurrentQuestion(randomQuestion(countries));
    } else {
      setQuizFinished(true);
      setShowScore(true);
    }
    if (current + 1 === totalQuestions) {
      navigate("/resultat", { state: { score, totalQuestions, namn } });
    }

    const showResults = () => {
      return (
        <div>
          <h2>Ditt Resultat</h2>
          <p>
            Poäng: {score} av {totalQuestions}
          </p>
        </div>
      );
    };

    const randomQuestion = (countries) => {
      const randomIndex = Math.floor(Math.random() * countries.length);
      return countries[randomIndex];
    };

    return (
      <div>
        <Navbar />
        <h2>
          Fråga {currentQuestion + 1} av {totalQuestions}
        </h2>
        <img
          src={currentQuestion.flags?.svg}
          alt={currentQuestion.name?.common}
          style={{ width: "200px", height: "100px" }}
        />
        <form onSubmit={handleSubmit}>
          <input
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Ditt svar"
          />
          <button type="submit">Se svar</button>
        </form>
      </div>
    );
  };
}

export default QuizGame;
