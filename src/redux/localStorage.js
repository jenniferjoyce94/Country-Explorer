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
  };

  return { savedCountries, addCountry, removeCountry };
};

export default useLocalStorage;
