import styles from "./Styles/Home.module.css";
import { Link } from "react-router-dom";
import heroImage from "./Styles/image/image.png";

function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Välkommen till Landsutforskaren</h1>
      <div className={styles.heroSection}>
        <img src={heroImage} alt="Världskarta" className={styles.heroImage} />
      </div>
      <p className={styles.description}>
        Utforska länder, spara dina favoriter och testa dina kunskaper med vårt
        quiz!
      </p>
      <div className={styles.buttonContainer}>
        <Link to="/countries">
          <button className={styles.button}>Lär dig om länder</button>
        </Link>

        <Link to="/collection">
          <button className={styles.button}>Se dina sparade länder</button>
        </Link>

        <Link to="/quizstart">
          <button className={styles.button}>Ta en quiz</button>
        </Link>

        <Link to="/leaderboard">
          <button className={styles.button}>Se topplistan</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
