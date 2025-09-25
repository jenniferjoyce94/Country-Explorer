import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { selectCountries, fetchCountries } from "../redux/CountriesSlice";
import styles from "./styles/QuizGame.module.css";
const totalQuestions = 15;

function QuizGame() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { region, userName } = state || {};

  const countries = useSelector(selectCountries);
  const status = useSelector((state) => state.countries.status);
  const error = useSelector((state) => state.countries.error);

  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answer, setAnswer] = useState("");
  const [giveAnswer, setGiveAnswer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);

  const regionMap = {
    Afrika: "Africa",
    Europa: "Europe",
    Asien: "Asia",
    Oceanien: "Oceania",
    Amerika: "Americas",
  };
  useEffect(() => {
    if (!region || !userName) {
      navigate("/quizstart");
    }
    const apiRegion = regionMap[region] || region;
    dispatch(fetchCountries(apiRegion));
  }, [region, userName, dispatch, navigate]);

  useEffect(() => {
    if (!countries || !countries.length) return;
    const shuffled = shuffle(countries);
    setQuestions(shuffled.slice(0, totalQuestions));
  }, [countries]);

  if (status === "loading") return <div>Laddar...</div>;
  if (status === "failed") return <div>Ett fel uppstod: {error}</div>;
  if (!questions.length) return <div>Inga frågor tillgängliga.</div>;

  const currentCountry = questions[currentQuestion];

  // Fisher-Yates shuffle algorithm
  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    if (!answer.trim()) return;

    const correctName =
      currentCountry.translations?.swe?.common || currentCountry.name.common;
    const correct = answer.trim().toLowerCase() === correctName.toLowerCase();
    if (correct) setScore(score + 1);
    setGiveAnswer(correct ? "Rätt!" : `Fel! Rätt svar är ${correctName}`);
    setUserAnswers([
      ...userAnswers,
      { question: currentCountry.name.common, answer, isCorrect: correct },
    ]);
    setAnswer("");
  };

  const handleBtnNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
      setGiveAnswer("");
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <h2 className={styles.title}>
        Fråga {currentQuestion + 1} av {totalQuestions} region: {region}
      </h2>
      <h3 className={styles.question}>Vilken flagga tillhör detta land?</h3>
      <img
        src={currentCountry.flags.png}
        alt={`Flag of ${currentCountry.name.common}`}
        className={styles.flagImage}
      />

      <div className={styles.answerSection}>
        {giveAnswer === "" && (
          <form onSubmit={handleSubmitAnswer}>
            <input
              className={styles.inputField}
              type="text"
              placeholder="Skriv ditt svar här"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button type="submit" className={styles.submitButton}>
              {" "}
              Svara
            </button>
          </form>
        )}
        {giveAnswer && <p>{giveAnswer}</p>}
        {showScore ? (
          <Link
            to={"/showScore"}
            state={{ score, totalQuestions, userName, region }}
          >
            <button className={styles.btnNext}>Visa resultat</button>
          </Link>
        ) : (
          giveAnswer &&
          (currentQuestion + 1 === totalQuestions ? (
            <Link
              to={"/showScore"}
              state={{ score, totalQuestions, userName, region }}
            >
              <button className={styles.btnNext}>Visa resultat</button>
            </Link>
          ) : (
            <button className={styles.btnNext} onClick={handleBtnNext}>
              Nästa fråga
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default QuizGame;
