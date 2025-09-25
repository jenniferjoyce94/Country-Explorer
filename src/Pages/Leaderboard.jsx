import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useMemo, useState } from "react";
import styles from "./Styles/Leaderboard.module.css";

const regions = ["Alla", "Afrika", "Amerika", "Asien", "Europa", "Oceanien"];

const Leaderboard = () => {
  const [selectedRegion, setSelectedRegion] = useState("Alla");
  const leaderboardNew = useMemo(() => {
    try {
      const data = localStorage.getItem("leaderboard");
      const array = data ? JSON.parse(data) : [];
      if (!Array.isArray(array)) {
        console.error("Leaderboard i localStorage är inte en array:", array);
        return [];
      }
      return array;
    } catch (e) {
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

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.title}>Topplistan</h1>
      <div className={styles.regionButtons}>
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`${styles.regionButton} ${
              selectedRegion === region ? styles.active : ""
            }`}
          >
            {region}
          </button>
        ))}
      </div>
      {topPlayers.length === 0 ? (
        <p className={styles.noResults}>
          Det finns inga resultat att visa för denna region ännu.
        </p>
      ) : (
        <div key={selectedRegion} className={styles.results}>
          <ol className={styles.playerList}>
            {topPlayers.map((x, index) => (
              <li key={index}>
                {x.userName}: {x.score} poäng
              </li>
            ))}
          </ol>
        </div>
      )}
      <button className={styles.startQuizBtn}>
        <Link to="/quizstart">Starta Quizet</Link>
      </button>
    </div>
  );
};

export default Leaderboard;
