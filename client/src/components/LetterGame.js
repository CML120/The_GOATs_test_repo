import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CustomButtonStyle } from "./chakraStyle";
import { Button, Flex, FormControl, chakra } from "@chakra-ui/react";
const CustomButton = chakra(Button, CustomButtonStyle);

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
      <h3 style={{ color: "gold", fontSize: "30px" }}>Guess the Next Letter</h3>

      <Flex justifyContent={"center"}>
        <div>
          <p style={{ color: "white" }}>What letter comes after: </p>
          <h4>{currentLetter}</h4>

          <input
            className="letter-input"
            type="text"
            name="userInput"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            placeholder="write here"
          />

          <CustomButton onClick={checkUserGuess}>Submit</CustomButton>
          {score >= 5 && showCongratulation && (
            <div style={{ color: "white" }}>
              <p>Congratulation! You have completed the game</p>
              <Link pr={{ base: 2, md: 4 }} to="/spellinggame">
                Play Spelling Game
              </Link>
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
      </Flex>

      <CustomButton onClick={playGame}>Play</CustomButton>
    </div>
  );
}

function AllLettersInOne(props) {
  const CustomButton = chakra(Button, CustomButtonStyle);
  return (
    <Flex justifyContent={"center"}>
      <div>
        {props.letters.map((letter, index) => (
          <CustomButton
            className="start-stop-button"
            key={index}
            onClick={() => props.onClick(letter)}
          >
            {letter}
          </CustomButton>
        ))}
      </div>
    </Flex>
  );
}

export default LetterGame;
export { AllLettersInOne };
