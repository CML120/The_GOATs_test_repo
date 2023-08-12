import React, { useState } from "react";
import { Link } from "react-router-dom";
function LetterGame() {
  const [currentLetter, setCurrentLetter] = useState("");
  const [userGuess, setUserGuess] = useState();
  const [score, setScore] = useState(0);
  const [showCongratulation, setShowCongratulation] = useState(false);

  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const randomLetter = () => {
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
  };

  const playGame = () => {
    const letter = randomLetter();
    setCurrentLetter(letter);
    setUserGuess("");
    setScore(0);
    setShowCongratulation(false);
  };

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
        <button onClick={checkUserGuess}>Check</button>
        {score >= 5 && showCongratulation && (
          <div>
            <p>Congratulation! You have completed the game</p>
            <Link to="/spellinggame">Play Spelling Game</Link>
            <Link to="/letters">Learn More</Link>
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

      <button onClick={playGame}>Another Round</button>
    </div>
  );
}

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
