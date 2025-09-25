import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchCountries } from "../redux/CountriesSlice";
import { Link } from "react-router-dom";
import HeartBtn from "../Components/HeartBtn";
import styles from "./Styles/Countries.module.css";

const regions = [
  { sv: "Afrika", en: "Africa" },
  { sv: "Amerikas", en: "Americas" },
  { sv: "Asien", en: "Asia" },
  { sv: "Europa", en: "Europe" },
  { sv: "Oceanien", en: "Oceania" },
];

const Countries = () => {
  const dispatch = useDispatch();
  const { countries, status, error } = useSelector((state) => state.countries);
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleFetch = async (region = selectedRegion) => {
    if (!region) return;
    dispatch(fetchCountries(region));
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.title}>Länder</h1>
      <div className={styles.selectContainer}>
        {regions.map((region) => (
          <button
            key={region.en}
            onClick={() => {
              setSelectedRegion(region.en);
              handleFetch(region.en);
            }}
            className={`${styles.regionButton} ${
              selectedRegion === region.en ? styles.active : ""
            }`}
          >
            {region.sv}
          </button>
        ))}
      </div>
      {status === "loading" && <p> Laddar länder...</p>}
      {status === "failed" && <p> Fel: {error}</p>}
      {status === "succeeded" && (
        <div className={styles.countryList}>
          {countries.map((country, index) => (
            <div
              key={`${country.cca3 || country.name.common}-${index}`}
              className={styles.countryItem}
            >
              <Link to={`/countries/${country.name.common}`}>
                <img
                  src={country.flags.png}
                  alt={country.translations?.swe?.common || country.name.common}
                  className={styles.flagImage}
                />
                <p>
                  {country.translations?.swe?.common || country.name.common}
                </p>
              </Link>
              <HeartBtn country={country} className={styles.heartBtn} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Countries;
