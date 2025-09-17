import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function CountryCard({ country }) {
  return (
    <div>
      <Navbar />
      <div className="country-card">
        <img src={country.flags.png} alt={`${country.name.common} flag`} />
        <h2>{country.name.common}</h2>
        <p>
          Valuta:{" "}
          {country.currencies &&
            (() => {
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
          Visa på karta
        </a>
        <button onClick={() => addCountry(country)}>Spara land</button>
      </div>
    </div>
  );
}
