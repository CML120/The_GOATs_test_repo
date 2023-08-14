import React, { useState, useEffect, useCallback } from "react";
import './WordGuessGame.css';

function WordGuessGame() {
    const [chosenWord, setChosenWord] = useState("");
    const [blanksLetters, setBlanksLetters] = useState([]);
    const [isWin, setIsWin] = useState(false);
    const [isLost, setIsLost] = useState(false);
    const [timer, setTimer] = useState(null);
    const [timerCount, setTimerCount] = useState(20);
    const [winCounter, setWinCounter] = useState(0);
    const [loseCounter, setLoseCounter] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [gameStarted, setGameStarted] = useState(false);

    const words = ['apple', 'banana', 'orange', 'grape', 'watermelon', 'strawberry', 'lemon', 'pineapple', 'blueberry', 'cherry'];

    const checkWin = useCallback((updatedBlanks) => {
        if (chosenWord === updatedBlanks.join("")) {
            setIsWin(true);
        }
    }, [chosenWord]);

    const checkLetters = useCallback((letter) => {
        const updatedBlanks = blanksLetters.map((blank, index) =>
            chosenWord[index] === letter || chosenWord[index] === ' ' ? chosenWord[index] : blank
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
        setTimerCount(20);
        startTimer();
        renderBlanks();
        setGameStarted(true);
    };

    const startTimer = () => {
        setTimer(setInterval(() => {
            setTimerCount(prevCount => prevCount - 1);
        }, 1000));
    };

    const renderBlanks = () => {
        const randomIndex = Math.floor(Math.random() * words.length);
        const wordToGuess = words[randomIndex];

        const blanksAndLetters = wordToGuess.split('').map((char) => (char === ' ' ? '_' : char));
        const shuffledLetters = shuffleArray(blanksAndLetters.filter((char) => char !== '_'));

        const blanksWithShuffledLetters = blanksAndLetters.map((char) => (char === '_' ? '_' : shuffledLetters.pop()));

        setChosenWord(wordToGuess);
        setBlanksLetters(blanksWithShuffledLetters);
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
            <p className="guess-word">Guess the fruit! {blanksLetters.join(" ")}</p>
            <p className="timer">Time left: {timerCount}</p>
            {!isLost && !isWin && (
                <button onClick={startGame} className="start-button" disabled={timerCount === 0}>
                    {timerCount === 20 ? "Start Game" : "Play Again"}
                </button>
            )}
            {isLost && <p className="result-message">You Lost! Try Again?</p>}
            {isWin && <p className="result-message">You Won! Play Again?</p>}
            {isLost && (
                <button onClick={startGame} className="start-button">
                    Try Again
                </button>
            )}
            {isWin && (
                <button onClick={startGame} className="start-button">
                    Play Again
                </button>
            )}
            <div className="win-loss-container">
                <p className="win-loss">Wins: {winCounter}</p>
                <p className="win-loss">Losses: {loseCounter}</p>
            </div>
        </div>
    );
}

export default WordGuessGame;
