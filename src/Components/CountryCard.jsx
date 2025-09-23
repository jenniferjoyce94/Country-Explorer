import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import HeartBtn from "./HeartBtn";

export default function CountryCard({ country }) {
  return (
    <div>
      <Navbar />
      <div className="country-card">
        <h2>{country.translations?.swe?.common || country.name.common}</h2>
        <img
          src={country.flags.png}
          alt={`${
            country.translations?.swe?.common || country.name.common
          } flag`}
        />
        <HeartBtn country={country} />
        <p>
          Valuta:{" "}
          {country.currencies &&
            (() => {
              if (!country) return <div>Landet hittades inte</div>;
              const first = Object.values(country.currencies)[0];
              return `${first.name} (${first.symbol})`;
            })()}
        </p>
        <p>Befolkning: {country.population}</p>
        <a
          href={country.maps.googleMaps}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visa på Google Maps
        </a>
      </div>
    </div>
  );
}
