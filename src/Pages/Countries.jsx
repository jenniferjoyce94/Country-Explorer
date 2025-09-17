import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchCountries } from "../redux/CountriesSlice";
import { Link } from "react-router-dom";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const Countries = () => {
  const dispatch = useDispatch();
  const { countries, status, error } = useSelector((state) => state.countries);
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleFetch = async () => {
    if (!selectedRegion) return;
    const response = await fetch(
      `https://restcountries.com/v3.1/region/${selectedRegion.toLowerCase()}`
    );
    const data = await response.json();
    dispatch(fetchCountries({ region: selectedRegion, data }));
  };

  return (
    <div>
      <Navbar />
      <h1>Länder</h1>
      <select
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
      >
        <option value="">Välj en region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      <button onClick={handleFetch}>Hämta länder</button>
      {status === "loading" && <p> Laddar länder...</p>}
      {status === "failed" && <p> Fel: {error}</p>}
      {status === "succeeded" && (
        <div className="country-list">
          {countries.map((country) => (
            <div key={country.name.common} className="country-item">
              <Link to={`/countries/${country.name.common}`}>
                <img
                  src={country.flags.png}
                  alt={`${country.name.common} flag`}
                />
                <p>{country.name.common}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Countries;
