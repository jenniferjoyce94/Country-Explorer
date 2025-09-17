import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import CountryCard from "../Components/CountryCard";
import { savedCountry, removeCountry } from "../redux/savedSlice";

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
            <CountryCard key={country.name.common} country={country} />
          ))
        )}
      </div>
    </div>
  );
};

export default Collection;
