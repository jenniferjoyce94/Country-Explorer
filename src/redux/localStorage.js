import { useState, useEffect } from "react";

const useLocalStorage = () => {
  const [savedCountries, setSavedCountries] = useState([]);

  useEffect(() => {
    localStorage.setItem("savedCountries", JSON.stringify(savedCountries));
  }, [savedCountries]);

  const addCountry = (country) => {
    if (!savedCountries.find((c) => c.name.common === country.name.common)) {
      setSavedCountries([...savedCountries, country]);
    }
  };

  const removeCountry = (countryName) => {
    setSavedCountries(
      savedCountries.filter((c) => c.name.common !== countryName)
    );

    const saveToLeaderboard = (entry) => {
      const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
      leaderboard.push(entry);
      localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    };
  };

  return { savedCountries, addCountry, removeCountry, saveToLeaderboard };
};

export default useLocalStorage;
