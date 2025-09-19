import styles from "./Styles/Home.module.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className={styles.home}>
      <h1>Välkommen till Landsutforskare</h1>
      <Link to="/Countries">
        <button>Lär dig om länder</button>
      </Link>
      <Link to="/Collection">
        <button>Se dina sparade länder</button>
      </Link>
      <Link to="/QuizStart">
        <button>Ta en quiz</button>
      </Link>
      <Link to="/Leaderboard">
        <button>Se topplistan</button>
      </Link>
    </div>
  );
}

export default Home;
