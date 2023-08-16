import React, { useState, useEffect, useCallback } from "react";
import './WordGuessGame.css';

function WordGuessGame() {
    const [chosenWord, setChosenWord] = useState("");
    const [blanksLetters, setBlanksLetters] = useState([]);
    const [hintsLetters, setHintsLetters] = useState([]);
    const [isWin, setIsWin] = useState(false);
    const [isLost, setIsLost] = useState(false);
    const [timer, setTimer] = useState(null);
    const [timerCount, setTimerCount] = useState(15);
    const [winCounter, setWinCounter] = useState(0);
    const [loseCounter, setLoseCounter] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [gameStarted, setGameStarted] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);

    const words = ['apple', 'banana', 'orange', 'grape', 'watermelon', 'strawberry', 'lemon', 'pineapple', 'blueberry', 'cherry','zebra' , 'cow', 'cat', 'dog', 'horse', 'spongebob', 'bear', 'woody', 'buzz', 'football', 'baseball', 'basketball' ];

    const checkWin = useCallback((updatedBlanks) => {
        if (chosenWord === updatedBlanks.join("")) {
            setIsWin(true);
        }
    }, [chosenWord]);

    const checkLetters = useCallback((letter) => {
        const updatedBlanks = blanksLetters.map((blank, index) =>
            chosenWord[index] === letter ? chosenWord[index] : blank
        );
        setBlanksLetters(updatedBlanks);
        checkWin(updatedBlanks);
    }, [blanksLetters, chosenWord, checkWin]);

    const handleKeyDown = useCallback((event) => {
        if (timerCount > 0 && !isWin && !isLost) {
            const key = event.key;
            const alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
            
            if (alphabetNumericCharacters.includes(key)) {
                checkLetters(key);
            }
        }
    }, [timerCount, isWin, isLost, checkLetters]);

    useEffect(() => {
        if (isWin) {
            clearInterval(timer);
            winGame();
        }
        if (timerCount === 0 && !isWin) {
            clearInterval(timer);
            loseGame();
        }
    }, [isWin, timerCount, timer]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [timerCount, isWin, isLost, handleKeyDown]);

    useEffect(() => {
        if (chosenWord && gameStarted) {
            setImageUrl(`/images/${chosenWord}.gif`);
        }
    }, [chosenWord, gameStarted]);

    const startGame = () => {
        setIsWin(false);
        setIsLost(false);
        setTimerCount(15);
        clearInterval(timer);
        startTimer();
        renderBlanks();
        setGameStarted(true);
        setShowInstructions(false);
    };

    const startTimer = () => {
        setTimer(setInterval(() => {
            setTimerCount(prevCount => prevCount - 1);
        }, 1000));
    };

    const renderBlanks = () => {
        const randomIndex = Math.floor(Math.random() * words.length);
        const wordToGuess = words[randomIndex];

        setChosenWord(wordToGuess);

        const shuffledWord = shuffleArray(wordToGuess.split(''));
        setBlanksLetters(Array.from({ length: wordToGuess.length }, () => '_'));
        setHintsLetters(shuffledWord);
    };

    const winGame = () => {
        setWinCounter(prevCounter => prevCounter + 1);
    };

    const loseGame = () => {
        setLoseCounter(prevCounter => prevCounter + 1);
        setIsLost(true);
    };

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    return (
        <div className="word-guess-game">
            {gameStarted && <img src={imageUrl} alt="Word Gif" className="word-gif" />}
            {showInstructions && (
                <p className="instructions">
                    Welcome to Guess the GIF! Use the keyboard to try to guess the word by filling in the blanks. You have 15 seconds to make each guess. Good luck!
                </p>
            )}
            <p className="guess-word">
                Guess the Gif! {blanksLetters.map((letter, index) => (
                    <span key={index} className="blank-letter">
                        {letter}
                    </span>
                ))}
            </p>
            <p className="hints">
                {hintsLetters.map((letter, index) => (
                    <span key={index} className="hint-letter">
                        {letter}
                    </span>
                ))}
            </p>
            <p className="timer">Time left: {timerCount}</p>
            {(!gameStarted || isLost || isWin) && (
                <button onClick={startGame} className="start-button-wgg">
                    {isWin ? "Play Again" : "Start Game"}
                </button>
            )}
            {isLost && <p className="result-message">You Lost! Try Again?</p>}
            {isWin && <p className="result-message">You Won! Play Again?</p>}
            <div className="win-loss-container">
                <p className="win-loss">Wins: {winCounter}</p>
                <p className="win-loss">Losses: {loseCounter}</p>
            </div>
        </div>
    );
}

export default WordGuessGame;
