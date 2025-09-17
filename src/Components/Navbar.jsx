import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/">Hem</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/countries">Lär dig om länder</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/collection">Dina Samlingar</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/quiz">Quiz</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/leaderboard">Topplistan</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
