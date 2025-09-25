import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import HeartBtn from "../Components/HeartBtn";
import { Link } from "react-router-dom";
import styles from "./Styles/Collection.module.css";

const Collection = () => {
  const savedCountries = useSelector((state) => state.saved.savedCountries);

  return (
    <div className={styles.container}>
      <Navbar />
      <h1>Din Samling</h1>
      <div className={styles.countryList}>
        {savedCountries.length === 0 ? (
          <p>Inga sparade länder</p>
        ) : (
          savedCountries.map((country, index) => (
            <div
              key={`${country.cca3 || country.name.common}-${index}`}
              className={styles.countryItem}
            >
              <Link
                to={`/countries/${country.name.common}`}
                className={styles.countryLink}
              >
                <img
                  src={country.flags.png}
                  alt={country.translations?.swe?.common || country.name.common}
                  className={styles.flagImage}
                />
                <p className={styles.countryName}>
                  {country.translations?.swe?.common || country.name.common}
                </p>
              </Link>
              <HeartBtn country={country} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Collection;
