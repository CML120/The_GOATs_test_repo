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
      <p>
        It's fun! As you hit the play button at the bottom, a letter will pop
        up. All you do is to write your answer in the white space and hit the
        submit. Then, you will see the answer, the next letter as well as your
        score.
      </p>
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
            <p>Congratulation! You have completed the game.</p>
            <Link to="/spellinggame">Play Spelling Game</Link>
            {/* <Link to="/letters">Learn More</Link>    may be to the play ground*/}
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
        <button
          key={index}
          onClick={() => props.onClick(index, letter)}
          style={{
            ...style.eachLetter,
            transform: props.onClick(index) ? "scale(1.1)" : "scale(1)",
          }}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

// module.exports = { LetterGame, AllLettersInOne };
export default LetterGame;
export { AllLettersInOne };
