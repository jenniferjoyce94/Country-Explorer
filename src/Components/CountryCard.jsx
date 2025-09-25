import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import HeartBtn from "./HeartBtn";
import styles from "./styles/CountryCard.module.css";

export default function CountryCard({ country }) {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.countryInfo}>
        <h2 className={styles.countryName}>
          {country.translations?.swe?.common || country.name.common}
        </h2>
        <img
          className={styles.flagImage}
          src={country.flags.png}
          alt={`${
            country.translations?.swe?.common || country.name.common
          } flag`}
        />
        <HeartBtn country={country} />
        <p className={styles.details}>
          <strong>Valuta: </strong>
          {country.currencies &&
            (() => {
              if (!country) return <div>Landet hittades inte</div>;
              const first = Object.values(country.currencies)[0];
              return `${first.name} (${first.symbol})`;
            })()}
        </p>
        <p className={styles.details}>
          <strong>Befolkning:</strong>{" "}
          {country.population?.toLocaleString("sv-SE") || "Okänd"}
        </p>
        <a
          className={styles.mapLink}
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
