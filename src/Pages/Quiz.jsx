import Navbar from "../Components/Navbar";
const Quiz = () => {
  return (
    <div>
      <Navbar />
      <h1>Quiz</h1>
      <select name="countries" id="countries">
        <option value="">Välj ett Region</option>
        <option value="Africa">Afrika</option>
        <option value="Americas">Amerika</option>
        <option value="Asia">Asien</option>
        <option value="Europe">Europa</option>
        <option value="Oceania">Oceanien</option>
      </select>
      <input type="text" placeholder="Ditt namn" />
      <button onClick={() => {}}>Starta Quiz</button>
      {startGame === "playing" && <p>Quizet har startat!</p>}
    </div>
  );
};

export default Quiz;
