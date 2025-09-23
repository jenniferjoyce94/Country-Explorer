import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CountryCard from "../Components/CountryCard";
import api from "../redux/api";

const CountryDetails = () => {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      const response = await fetch(
        `${api()}/name/${countryName}?fields=name,translations,capital,region,flags,population,maps`
      );
      const data = await response.json();
      setCountry(data[0]);
    };

    fetchCountry();
  }, [countryName]);

  return (
    <div>
      {country ? (
        <CountryCard country={country} />
      ) : (
        <div>Landet hittades inte</div>
      )}
    </div>
  );
};

export default CountryDetails;
