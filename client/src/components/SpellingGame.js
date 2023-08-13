//Import dependencies
import React, { useState, useEffect } from 'react';
import SpeechRecognitionComponent from './SpeechRecognitionComponent'; // Import the SpeechRecognitionComponent
import './SpellingGame.css';
//importing dependencies for fetching words from the database
import { useQuery } from '@apollo/client';
import { FETCH_WORDS_BY_DIFFICULTY } from '../utils/queries';
import { GiphyFetch } from "@giphy/js-fetch-api";
const giphyFetch = new GiphyFetch("AM5Vpj9SrOavAd2CktwDnrIjgpIuMe6j");

const SpellingGame = () => {
  // State variables 
  const [spokenWord, setSpokenWord] = useState(''); // the letter(s) or word spoken by the player
  const [correctWord, setCorrectWord] = useState('');  //the selected word from the array
  const [correctWordsCount, setCorrectWordsCount] = useState(0); // keeps count of how many words have been spelled correctly
  const [currentLevel, setCurrentLevel] = useState(1); //keeps track of the current player level difficulty
  const [typedWord, setTypedWord] = useState(''); //the word typed by the player
  const [isNewWordNeeded, setIsNewWordNeeded] = useState(true); //keeps track of whether a new word needs to be generated
  const [message, setMessage] = useState(''); //the message to be displayed to the player in the message div on the page
  const [gifUrl, setGifUrl] = useState(''); //the url of the gif to be displayed to the player in the message div on the page
  const [altText, setAltText] = useState(''); //the alt text to be displayed to the player in the message div on the page

  // const wordsArray = ['apple', 'banana', 'orange', 'grape', 'watermelon', 'strawberry', 'lemon'];
  const wordsArray = [];

  // Function to get a random word from the wordsArray or database based on player level
  const getRandomWord = () => {
    if (!loading && data && data.getWordsByDifficulty.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.getWordsByDifficulty.length);
      return data.getWordsByDifficulty[randomIndex].word;
    } else {
      const randomIndex = Math.floor(Math.random() * wordsArray.length);
      return wordsArray[randomIndex];
    }
  };


  // fetch words based on the player's current level
  const { loading, error, data } = useQuery(FETCH_WORDS_BY_DIFFICULTY, {
    variables: { level: currentLevel },
  });

  // Gets a random word from the database that was previously determined by the player level
  useEffect(() => {
    if (!loading && data && data.getWordsByDifficulty.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.getWordsByDifficulty.length);
      const newCorrectWord = data.getWordsByDifficulty[randomIndex].word;
      setCorrectWord(newCorrectWord);
      setIsNewWordNeeded(false);
      giphyWordImage(newCorrectWord); // Fetch and display the GIF image
    }
  }, [loading, data, currentLevel]);
  
  useEffect(() => {
    // Generate a new correct word when needed
    if (isNewWordNeeded) {
      const newCorrectWord = getRandomWord();
      setCorrectWord(newCorrectWord);
      setIsNewWordNeeded(false);
      giphyWordImage(newCorrectWord); // Fetch and display the GIF image
    }
  }, [isNewWordNeeded]);

  // Function to speak a word using the Web Speech API
  const speakWord = (word) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(word);
    speechSynthesis.speak(utterance);
  };

  // Update spokenWord with each spoken letter
  const handleSpokenWord = (word) => {
    const spokenLetter = word.toLowerCase();
    setSpokenWord((prevSpokenWord) => prevSpokenWord + spokenLetter);
  };

  // Check the spelling of the spoken word
  const checkSpelling = () => {

    if (!spokenWord.includes(' ')) {
      setMessage('Please spell the word');
      clearSpokenLetters();
      return;
    }
    const checkSpokenWord = spokenWord.replace(/\s+/g, '').toLowerCase();
    const checkSelectedWord = correctWord.replace(/\s+/g, '').toLowerCase();

    if (!checkSpokenWord) {
      setMessage('You must spell the word first.');
    } else if (checkSpokenWord === checkSelectedWord.slice(0, checkSpokenWord.length)) {
      handleCorrectWord();
    } else {
      setMessage('Incorrect spelling. Try again.');
    }
  };

  // Handle correct spelling and word progression
  const handleCorrectWord = () => {
    setCorrectWordsCount((prevCount) => prevCount + 1);

    if (correctWordsCount + 1 === 5) {
      setCurrentLevel((prevLevel) => prevLevel + 1);
      setCorrectWordsCount(0);
    }
    handleNewWord(); // Generate a new word for the game
    
  };

  // Clear spoken letters
  const clearSpokenLetters = () => {
    setSpokenWord('');
  };

  // Handle change of typed word input
  const handleTypedWordChange = (event) => {
    setTypedWord(event.target.value);
  };

  // Handle keyboard submission for spelling check
  const handleKeyboardSubmit = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleCheckSpelling();
    }
  };

  // Handle spelling check for typed word
  const handleCheckSpelling = () => {
    if (checkWord(typedWord)) {
      const checkSelectedWord = correctWord.replace(/\s+/g, '').toLowerCase();
      const checkTypedWord = typedWord.replace(/\s+/g, '').toLowerCase();

      if (checkTypedWord === checkSelectedWord) {
        handleCorrectWord();
      } else {
        setMessage('Incorrect spelling. Please try again.');
      }
    } else {
      setMessage('Please enter a valid word.');
    }
    setTypedWord('');
    handleNewWord(); // Generate a new word for the game
  };

  // Check if a word contains only valid characters
  const checkWord = (word) => {
    const spelledWord = word.replace(/\s/g, '');
    return spelledWord === word;
  };

  // Handle generating a new word for the game
  const handleNewWord = () => {
    setSpokenWord('');
    setIsNewWordNeeded(true);
    setCorrectWord(getRandomWord());
  };

  // handle fetching an image and title from giphy based on the selected word
  const giphyWordImage = async (word) => {
    try {
      const gifResponse = await giphyFetch.search(word);
      
      if (gifResponse.data && gifResponse.data.length > 0) {
        const fetchedGifUrl = gifResponse.data[0].images.downsized_medium.url;
        const fetchedAltText = gifResponse.title;
        setGifUrl(fetchedGifUrl);
        setAltText(fetchedAltText);
      }
    } catch (error) {
      console.error("Error fetching GIF:", error);
    }
  };
  

  return (
    <div className="spelling-game">
      <h1>Spelling Game</h1>
      <h2>Please have your microphone plugged in and ready!</h2>
      <div className="message-container">
        <p className="message">{message}</p>
      </div>
      <p>
  Level: {currentLevel <= 5 ? (
    Array.from({ length: currentLevel }, (_, index) => (
      <span key={index}>&#9733;</span>
    ))
  ) : (
    "G.R.O.A.T."
  )}
</p>
      <p>Correct Words: {correctWordsCount}</p>
      <p>Selected Word: "{correctWord}"</p>
      <SpeechRecognitionComponent handleSpokenWord={handleSpokenWord} />
      <button onClick={() => speakWord(correctWord)}>Hear Word</button>
      <button onClick={clearSpokenLetters}>Clear Spoken Letters</button>
      <div className="spoken-word-container">
        <p>Spoken Letters: {spokenWord}</p>
      </div>
      <button onClick={checkSpelling}>Check Spelling</button>
      <button type="button" onClick={handleNewWord}>New Word</button>
      <div>
        <input
          type="text"
          value={typedWord}
          onChange={handleTypedWordChange}
          onKeyUp={handleKeyboardSubmit}
          placeholder="Type the spelled word"
        />
        <button type="button" onClick={handleCheckSpelling}>Check Spelling</button>
      </div>

      <div className="gif-container">
        {gifUrl && <img src={gifUrl} alt={altText} />}
   
      </div>

    </div>
  );
};

export default SpellingGame;
