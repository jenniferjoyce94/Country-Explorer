import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CountryCard from "../Components/CountryCard";
import api from "../redux/api";

const CountryDetails = () => {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);
        setError(null);
        const encodedCountryName = encodeURIComponent(countryName);
        const url = `${api()}/name/${encodedCountryName}?fields=name,translations,capital,region,flags,population,maps,currencies`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data && data.length > 0) {
          setCountry(data[0]);
        } else {
          setError("Landet hittades inte");
        }
      } catch (err) {
        setError(`Fel vid hämtning av landdata: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (countryName) {
      fetchCountry();
    }
  }, [countryName]);

  if (loading) {
    return <div>Laddar landet...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
