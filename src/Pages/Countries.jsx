import { use } from "react";
import Navbar from "../Components/Navbar";
import { useDispatch } from "react-redux";

const Countries = () => {
 const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
 const dispatch = useDispatch();
 const [selectedRegion, setSelectedRegion] = useState("");

 useffect(() => {

  return (
    <div>
      <Navbar />
      <h1>Länder</h1>
    </div>
  );
};

export default Countries;
