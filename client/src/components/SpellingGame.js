//Import dependencies
import React, { useState, useEffect } from 'react';
import SpeechRecognitionComponent from './SpeechRecognitionComponent';
import './SpellingGame.css';

const SpellingGame = () => {
  // Variables to keep track of the spoken and correct words, the correct words count, and level
  const [spokenWord, setSpokenWord] = useState('');
  const [correctWord, setCorrectWord] = useState('');
  const [correctWordsCount, setCorrectWordsCount] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [typedWord, setTypedWord] = useState('');

  // Array of words that can be selected for the game
  const wordsArray = ['apple', 'banana', 'orange', 'grape', 'watermelon', 'strawberry', 'lemon'];

  // Function to get a random word from the wordsArray
  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    return wordsArray[randomIndex];
  };

  // useEffect hook to set a random word as the correctWord on page load
 
  useEffect(() => {
    setCorrectWord(getRandomWord());
  }, [getRandomWord]);

  // Speak the word passed into this function using the Web Speech API
  const speakWord = (word) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(word);
    speechSynthesis.speak(utterance);
  };

  // Handle the spoken word and update the spokenWord state
  const handleSpokenWord = (word) => {
    const spokenLetter = word.toLowerCase();
    setSpokenWord((prevSpokenWord) => prevSpokenWord + spokenLetter);
  };

  // Check if the spoken word matches the correct word
  const checkSpelling = () => {
    const checkSpokenWord = spokenWord.replace(/\s+/g, '').toLowerCase();
    const checkSelectedWord = correctWord.replace(/\s+/g, '').toLowerCase();

    // Check if an attempt was made to spell the word before comparing the spoken word/letters with the selected word
    if (!checkSpokenWord) {
      alert('You must spell the word first.');
    } else if (checkSpokenWord === checkSelectedWord.slice(0, checkSpokenWord.length)) {
      alert('Correct spelling!');
    } else {
      alert('Incorrect spelling. Try again.');
    }
  };

  // Clear the spoken letters state
  const clearSpokenLetters = () => {
    setSpokenWord('');
  };

  // Function to handle when the typed word is changed
  const handleTypedWordChange = (event) => {
    setTypedWord(event.target.value);
  };

  // Function to check if the word passed in is a valid word
  const handleKeyboardSubmit = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (checkWord(typedWord)) {
        setCorrectWordsCount((prevCount) => prevCount + 1);

        if (correctWordsCount + 1 === 5) {
          setCurrentLevel((prevLevel) => prevLevel + 1);
          setCorrectWordsCount(0);
        }
      } else {
        alert('Incorrect spelling. Please try again.');
      }
      setTypedWord('');
    }
  };

  // Function to check if the word passed in is a valid word
  const checkWord = (word) => {
    const spelledWord = word.replace(/\s/g, '');
    return spelledWord === word;
  };

  // Function to handle when the user wants to get a new word
  const handleNewWord = () => {
    setSpokenWord('');
    setCorrectWord(getRandomWord());
  };

  // content for the SpellingGame component
  return (
    <div className="spelling-game">
      <h1>Spelling Game</h1>
      <h2>Please have your microphone plugged in and ready!</h2>
      <p>Level: {currentLevel}</p>
      <p>Correct Words: {correctWordsCount}</p>
      <p>Selected Word: "{correctWord}"</p>
      {/* SpeechRecognitionComponent is a custom component to recognize spoken words */}
      <SpeechRecognitionComponent handleSpokenWord={handleSpokenWord} />
      <button onClick={() => speakWord(correctWord)}>Hear Word</button>
      <button onClick={clearSpokenLetters}>Clear Spoken Letters</button>
      <div className="spoken-word-container">
        <p>Spoken Letters: {spokenWord}</p>
      </div>
      <button onClick={checkSpelling}>Check Spelling</button> <button type="button" onClick={handleNewWord}>New Word</button>
      <div>
        <input
          type="text"
          value={typedWord}
          onChange={handleTypedWordChange}
          onKeyUp={handleKeyboardSubmit} // Add the onKeyUp event handler
          placeholder="Type the spelled word"
        />
        <button type="button" onClick={handleKeyboardSubmit}>Check Spelling</button>
      </div>
      
    </div>
  );
};

export default SpellingGame;
