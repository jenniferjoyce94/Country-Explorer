import { savedCountry, removeCountry } from "../redux/savedSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles/HeartBtn.module.css";

const HeartBtn = ({ country }) => {
  const dispatch = useDispatch();
  const savedCountries = useSelector((state) => state.saved.savedCountries);
  const isSaved = savedCountries.some(
    (c) => c.name.common === country.name.common
  );

  const handleClick = () => {
    if (isSaved) {
      dispatch(removeCountry(country.name.common));
    } else {
      dispatch(savedCountry(country));
    }
  };

  return (
    <button onClick={handleClick} className={styles.heartBtn}>
      <i className={isSaved ? "fas fa-heart" : "far fa-heart"} />
    </button>
  );
};

export default HeartBtn;
