import 

function ShowScore({ score, totalQuestions }) {

    return (
        <div>
            <h2>Ditt Resultat</h2>
            <p>
                Poäng: {score} av {totalQuestions}
            </p>
         
        </div>
    );
};

export default ShowScore;