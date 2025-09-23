import Navbar from "../Components/Navbar";

const Leaderboard = () => {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  const sortLeaderboard = (a, b) => b.score - a.score;
  leaderboard.sort(sortLeaderboard);

  const topPlayers = leaderboard.slice(0, 10);

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
