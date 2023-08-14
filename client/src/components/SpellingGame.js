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
  const [correctWordsCount, setCorrectWordsCount] = useState(1); // keeps count of how many words have been spelled correctly
  const [currentLevel, setCurrentLevel] = useState(1); //keeps track of the current player level difficulty
  const [typedWord, setTypedWord] = useState(''); //the word typed by the player
  const [isNewWordNeeded, setIsNewWordNeeded] = useState(true); //keeps track of whether a new word needs to be generated
  const [message, setMessage] = useState(''); //the message to be displayed to the player in the message div on the page
  const [gifUrl, setGifUrl] = useState(''); //the url of the gif to be displayed to the player in the div on the page
  const [altText, setAltText] = useState(''); //the alt text to be displayed to the player in the div on the page

  // const wordsArray = ['apple', 'banana', 'orange', 'grape', 'watermelon', 'strawberry', 'lemon'];
  const wordsArray = [];

  // Function to get a random word from the wordsArray or database based on player level
  const getRandomWord = () => {
    // Check if there's no loading, data exists, and there are words fetched from the database
    if (!loading && data && data.getWordsByDifficulty.length > 0) {
      // Calculate a random index within the range of words available in the data
      const randomIndex = Math.floor(Math.random() * data.getWordsByDifficulty.length);
      // Return the randomly selected word from the database
      return data.getWordsByDifficulty[randomIndex].word;
    } else {
      //otherwise, grab a random word from the wordsArray
      const randomIndex = Math.floor(Math.random() * wordsArray.length);
      return wordsArray[randomIndex];
    }
  };


  // fetch words based on the player's current level
  const { loading, error, data } = useQuery(FETCH_WORDS_BY_DIFFICULTY, {
    variables: { level: currentLevel },
  });

  // Gets a random word from the database that was previously determined by the player level
  //useEffect hook runs when the dependencies are changed or updated, this first use effect sets the initial word
  useEffect(() => {
    if (!loading && data && data.getWordsByDifficulty.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.getWordsByDifficulty.length);
      const newCorrectWord = data.getWordsByDifficulty[randomIndex].word;
      setCorrectWord(newCorrectWord);
      setIsNewWordNeeded(false);
      giphyWordImage(newCorrectWord); // Fetch and display the GIF image
    }
  }, [loading, data, currentLevel]);

  //this second use effect generates a new word based on the state of isNewWordNeeded
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
    const speechSynthesis = window.speechSynthesis;  // Get the SpeechSynthesis object from the global window object
    const utterance = new SpeechSynthesisUtterance(word); // Create a new SpeechSynthesisUtterance, passing in the selected word
    speechSynthesis.speak(utterance); // Instruct the SpeechSynthesis to speak the utterance (selected word)
  };

  // Update spokenWord with each spoken letter
  const handleSpokenWord = (word) => {
    const spokenLetter = word.toLowerCase();  //convert the letter to lower case
    setSpokenWord((prevSpokenWord) => prevSpokenWord + spokenLetter);  // Update the state with the spoken letter(s)
  };

  // Check the spelling of the spoken word
  const checkSpelling = () => {
    // checks for spaces in the spokenWord variable, which determines if the word was spelled out by letters, or the word was spoken directly
    if (!spokenWord.includes(' ')) {
      //if the word doesn't contain spaces, indicating it was spoken and not spelled, then clear the letters out and ask the player to spell the word
      setMessage('Please spell the word');
      clearSpokenLetters();
      return;
    }
    //removes spaces from the spokenWord variable
    const checkSpokenWord = spokenWord.replace(/\s+/g, '').toLowerCase();
    //removes spaces from the correctWord variable
    const checkSelectedWord = correctWord.replace(/\s+/g, '').toLowerCase();
    //check if an attempt was made to spell the word
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
    setCorrectWordsCount((prevCount) => prevCount + 1); // increment the correct words count

    if (correctWordsCount + 1 === 5) { // If the player has spelled 5 correct words
      setCurrentLevel((prevLevel) => prevLevel + 1); // Increment the current level
      setCorrectWordsCount(0); // Reset the correct word count to 0
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
  //makes an asynchronous call to the giphy api to fetch the gif and title
  const giphyWordImage = async (word) => {
    try {
      const gifResponse = await giphyFetch.search(word);
      //check if the response contains
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
      {/* <p>Correct Words: {correctWordsCount}</p>
      <p>Selected Word: "{correctWord}"</p> */}
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
