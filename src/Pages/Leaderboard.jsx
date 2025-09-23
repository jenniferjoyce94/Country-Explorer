import Navbar from "../Components/Navbar";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const region = localStorage.getItem("region") || "Alla";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const dispatch = useDispatch();
  const topPlayers = leaderboard.slice(0, 10);

  useEffect(() => {
    const storedLeaderboard =
      JSON.parse(localStorage.getItem("leaderboard")) || [];
    setLeaderboard(storedLeaderboard);
  }, []);

  const sortLeaderboard = (a, b) => b.score - a.score;
  leaderboard.sort(sortLeaderboard);

  useEffect(() => {
    dispatch({ type: "SET_REGION", payload: region });
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <h1>Topplistan</h1>
      <ol>
        {topPlayers.map((x, index) => (
          <li key={index}>
            {x.userName}: {x.score} poäng
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
