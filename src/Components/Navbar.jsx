import { Link } from "react-router-dom";
import styles from "./styles/Navbar.module.css";

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
            <Link to="/collection">Dina Samling</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/quizStart">Quiz</Link>
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
