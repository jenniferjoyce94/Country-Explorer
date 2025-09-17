import { Link } from "react-router-dom";

export default function CountryCard({ country }) {
  return (
    <div className="country-card">
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      <h2>{country.name.common}</h2>
      <p>Valuta: {country.currencies[0].name}</p>
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
  );
}
