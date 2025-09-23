import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { selectCountries, fetchCountries } from "../redux/CountriesSlice";
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

  useEffect(() => {
    if (!region || !userName) {
      navigate("/quizstart");
    }
    dispatch(fetchCountries(region));
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

  const saveLocalStorage = (Payload) => {
    try {
      const key = "quizResults";
      const existing = JSON.parse(localStorage.getItem(key)) || [];
      existing.push(Payload);
      localStorage.setItem(key, JSON.stringify(existing));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  };
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
      saveLocalStorage({ userName, score, totalQuestions });
    }
  };

  return (
    <div>
      <Navbar />
      <h2>
        Fråga {currentQuestion + 1} av {totalQuestions} region: {region}
      </h2>
      <h3>Vilket flagga tillhör detta land?</h3>
      <span>Svara på engelska</span>
      <div>
        <img
          src={currentCountry.flags.png}
          alt={`Flag of ${currentCountry.name.common}`}
          style={{ width: "200px", height: "100px" }}
        />
      </div>
      {giveAnswer === "" && (
        <form onSubmit={handleSubmitAnswer}>
          <input
            type="text"
            placeholder="Skriv ditt svar här"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button type="submit"> Svara</button>
        </form>
      )}
      {giveAnswer && <p>{giveAnswer}</p>}
      {showScore ? (
        <Link to={"/showScore"} state={{ score, totalQuestions, userName }}>
          <button className="btnNext">Visa resultat</button>
        </Link>
      ) : (
        giveAnswer && (
          <button className="btnNext" onClick={handleBtnNext}>
            Nästa fråga
          </button>
        )
      )}
    </div>
  );
}

export default QuizGame;
