import React, { useState, useEffect } from 'react';
import SpeechRecognitionComponent from './SpeechRecognitionComponent';
import './SpellingGame.css';

const SpellingGame = () => {
  const [spokenWord, setSpokenWord] = useState('');
  const [correctWord, setCorrectWord] = useState('');
  const wordsArray = ['apple', 'banana', 'orange', 'grape', 'watermelon', 'strawberry', 'lemon'];

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    return wordsArray[randomIndex];
  };

  useEffect(() => {
    // Set a random word as the correctWord on page load
    setCorrectWord(getRandomWord());
  }, []);

  const speakWord = (word) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(word);
    speechSynthesis.speak(utterance);
  };

  const handleSpokenWord = (word) => {
    const spokenLetter = word.toLowerCase();
    setSpokenWord((prevSpokenWord) => prevSpokenWord + spokenLetter);
  };

  const checkSpelling = () => {
    const checkSpokenWord = spokenWord.replace(/\s+/g, '').toLowerCase();
    const checkSelectedWord = correctWord.replace(/\s+/g, '').toLowerCase();
    
    if (!checkSpokenWord) {
      alert('You must spell the word first.');
    } else if (checkSpokenWord === checkSelectedWord.slice(0, checkSpokenWord.length)) {
      alert('Correct spelling!');
    } else {
      alert('Incorrect spelling. Try again.');
    }
  };

  const clearSpokenLetters = () => {
    setSpokenWord('');
  };

  const handleNewWord = () => {
    setSpokenWord('');
    setCorrectWord(getRandomWord());
  };

  return (
    <div className="spelling-game">
      <h1>Spelling Game</h1>
      <h2>Please have your microphone plugged in and ready!</h2>
      <p>Selected Word: "{correctWord}"</p>
      <SpeechRecognitionComponent handleSpokenWord={handleSpokenWord} />
      <button onClick={() => speakWord(correctWord)}>Hear Word</button>
      <button onClick={clearSpokenLetters}>Clear Spoken Letters</button>
      <div className="spoken-word-container">
        <p>Spoken Letters: {spokenWord}</p>
      </div>
      <button onClick={checkSpelling}>Check Spelling</button>
      <button onClick={handleNewWord}>New Word</button>
    </div>
  );
};

export default SpellingGame;
