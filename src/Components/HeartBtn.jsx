import { useState } from "react";
import { savedCountry, removeCountry } from "../redux/savedSlice";
import { useDispatch, useSelector } from "react-redux";

const HeartBtn = ({ country }) => {
  const dispatch = useDispatch();
  const savedCountries = useSelector((state) => state.saved.savedCountries);
  const [isSaved, setIsSaved] = useState(
    savedCountries.some((c) => c.cca3 === country.cca3)
  );

  const handleClick = () => {
    if (isSaved) {
      dispatch(removeCountry(country.name.common));
    } else {
      dispatch(savedCountry(country));
    }
    setIsSaved(!isSaved);
  };

  return (
    <button onClick={handleClick} className="heart-btn">
      <i className={isSaved ? "fas fa-heart" : "far fa-heart"} />
    </button>
  );
};

export default HeartBtn;
