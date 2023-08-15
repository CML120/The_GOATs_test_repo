import React, { useState } from "react";
import { Link } from "react-router-dom";
function LetterGame({ letters }) {
  // State variable
  const [currentLetter, setCurrentLetter] = useState("");
  const [userGuess, setUserGuess] = useState();
  const [score, setScore] = useState(0);
  const [showCongratulation, setShowCongratulation] = useState(false);

  // Generate random letter
  const randomLetter = () => {
    const randomIndex = Math.floor(Math.random() * letters.length) - 1;
    return letters[randomIndex];
  };

  // Start the game
  const playGame = () => {
    const letter = randomLetter();
    setCurrentLetter(letter);
    setUserGuess("");
    setScore(0);
    setShowCongratulation(false);
  };

  // Check the user guess
  const checkUserGuess = () => {
    playGame();
    if (
      userGuess &&
      userGuess.toUpperCase() === letters[letters.indexOf(currentLetter) + 1]
    ) {
      if (score < 4) {
        setScore(score + 1);
      } else if (score === 4) {
        setScore(score + 1);
        setShowCongratulation(true);
      }
    }
    setUserGuess("");
  };

  return (
    <div>
      <h3>Guess the Next Letter</h3>
      <p>Score: {score}</p>

      <div>
        {/* audio?? prop drill the speech recognition and giphyImage */}
        <p>What letter comes after: </p>
        <h4>{currentLetter}</h4>
        <input
          className="letter-input"
          type="text"
          name="userInput"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder="write here"
        />
        <button onClick={checkUserGuess}>Submit</button>
        {score >= 5 && showCongratulation && (
          <div>
            <p>Congratulation! You have completed the game</p>
            <Link to="/spellinggame">Play Spelling Game</Link>
            <Link to="/playground">Go to Play Ground</Link>
          </div>
        )}

        {userGuess && (
          <p>
            {userGuess.toUpperCase() ===
            letters[letters.indexOf(currentLetter) + 1]
              ? "Correct!"
              : `Oops! The correct answer is ${
                  letters[letters.indexOf(currentLetter) + 1]
                }`}
          </p>
        )}
      </div>

      <button onClick={playGame}>Play</button>
    </div>
  );
}

const style = {
  eachLetter: {
    fontSize: "4rem",
    padding: "1rem",
    transform: `scale(1.1)`,
    transition: "transition 0.2s ease in-out",
  },
};
function AllLettersInOne(props) {
  return (
    <div>
      {props.letters.map((letter, index) => (
        <button key={index} onClick={() => props.onClick(letter)}>
          {letter}
        </button>
      ))}
    </div>
  );
}

// module.exports = { LetterGame, AllLettersInOne };
export default LetterGame;
export { AllLettersInOne };
