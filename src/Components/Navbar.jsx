import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/countries">Countries</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/collection">Collection</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/quiz">Quiz</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
