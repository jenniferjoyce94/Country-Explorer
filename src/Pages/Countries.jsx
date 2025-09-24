import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchCountries } from "../redux/CountriesSlice";
import { Link } from "react-router-dom";
import HeartBtn from "../Components/HeartBtn";

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

  const handleFetch = async () => {
    if (!selectedRegion) return;
    const response = await fetch(
      `https://restcountries.com/v3.1/region/${selectedRegion}`
    );
    const data = await response.json();
    dispatch(fetchCountries(selectedRegion));
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
          <option key={region.en} value={region.en}>
            {region.sv}
          </option>
        ))}
      </select>
      <button onClick={handleFetch}>Hämta länder</button>
      {status === "loading" && <p> Laddar länder...</p>}
      {status === "failed" && <p> Fel: {error}</p>}
      {status === "succeeded" && (
        <div className="country-list">
          {countries.map((country, index) => (
            <div
              key={`${country.cca3 || country.name.common}-${index}`}
              className="country-item"
            >
              <HeartBtn country={country} />
              <Link to={`/countries/${country.name.common}`}>
                <img
                  src={country.flags.png}
                  alt={country.translations?.swe?.common || country.name.common}
                />
                <p>
                  {country.translations?.swe?.common || country.name.common}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Countries;
