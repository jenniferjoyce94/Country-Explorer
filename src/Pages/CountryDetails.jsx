import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CountryCard from "../Components/CountryCard";

const CountryDetails = () => {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/region/${countryName}`
      );
      const data = await response.json();
      setCountry(data[0]);
    };
    fetchCountry();
  }, [countryName]);

  function addCountry(country) {
    const saved = JSON.parse(localStorage.getItem("savedCountries")) || [];
    saved.push(country);
    localStorage.setItem("savedCountries", JSON.stringify(saved));
  }

  if (!country) {
    return <div>Landet hittades inte</div>;
  }
  return (
    <div>
      <CountryCard country={country} />
    </div>
  );
};

export default CountryDetails;
