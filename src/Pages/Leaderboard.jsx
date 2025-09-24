import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { use, useMemo, useState } from "react";

const regions = ["Alla", "Afrika", "Amerika", "Asien", "Europa", "Oceanien"];

const Leaderboard = () => {
  const [selectedRegion, setSelectedRegion] = useState("Alla");
  const leaderboardNew = useMemo(() => {
    try {
      const rawData = localStorage.getItem("leaderboard");
      const arr = rawData ? JSON.parse(rawData) : [];
      if (!Array.isArray(arr)) {
        console.error("Leaderboard i localStorage är inte en array:", arr);
        return [];
      }
      return arr;
    } catch (e) {
      console.error("Fel vid tolkning av leaderboard i localStorage", e);
      return [];
    }
  }, []);

  const filterRegion = useMemo(() => {
    const grouped = {};
    for (const entry of leaderboardNew) {
      if (!grouped[entry.region]) {
        grouped[entry.region] = [];
      }
      grouped[entry.region].push(entry);
    }
    return grouped;
  }, [leaderboardNew]);

  const topPlayers = useMemo(() => {
    let filteredData;
    if (selectedRegion === "Alla") {
      filteredData = leaderboardNew;
    } else {
      filteredData = filterRegion[selectedRegion] || [];
    }

    return filteredData.sort((a, b) => b.score - a.score).slice(0, 10);
  }, [selectedRegion, filterRegion, leaderboardNew]);

  console.log("Leaderboard från localStorage:", leaderboardNew);

  return (
    <div>
      <Navbar />
      <h1>Topplistan</h1>
      <select
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
      >
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      {topPlayers.length === 0 ? (
        <p>Det finns inga resultat att visa för denna region ännu.</p>
      ) : (
        <div key={selectedRegion}>
          <h2>Topplista för {selectedRegion}</h2>
          <ol>
            {topPlayers.map((x, index) => (
              <li key={index}>
                {x.userName}: {x.score} poäng
              </li>
            ))}
          </ol>
        </div>
      )}
      <button>
        <Link to="/quizstart">Starta Quizet</Link>
      </button>
    </div>
  );
};

export default Leaderboard;
