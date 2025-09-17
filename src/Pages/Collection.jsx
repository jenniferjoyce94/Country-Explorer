import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import HeartBtn from "../Components/HeartBtn";
import { Link } from "react-router-dom";

const Collection = () => {
  const savedCountries = useSelector((state) => state.saved.savedCountries);

  return (
    <div>
      <Navbar />
      <h1>Din Samling</h1>
      <div className="country-list">
        {savedCountries.length === 0 ? (
          <p>Inga sparade länder</p>
        ) : (
          savedCountries.map((country) => (
            <div key={country.name.common} className="country-item">
              <HeartBtn country={country} />
              <Link to={`/countryDetails/${country.name.common}`}>
                <img src={country.flags.png} alt={country.name.common} />
                <p>{country.name.common}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Collection;
