import React, { useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
// import SpeechRecognitionComponent from "./SpeechRecognitionComponent";
// import SpellingGame from "./SpellingGame";

const giphyApiKey = "AM5Vpj9SrOavAd2CktwDnrIjgpIuMe6j";
const gf = new GiphyFetch(giphyApiKey);

// https://balsamiq.cloud/s4ss2ue/pze1uia/r2278
export default function PracticeLetter(props) {
  const [userSound, setuserSound] = useState("");
  const [results, setResults] = useState([]);
  const [recognitionInstance, setRecognitionInstance] = useState(null);
  const [showLetters, setShowLetters] = useState(false);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

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

  const giphyImage = async (letter) => {
    try {
      const response = await gf.animate(letter, { limit: 10 });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
      setResults([]);
    }
  };

  const speakWord = (word) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(word);
    speechSynthesis.speak(utterance);
  };

  const startSoundRecognition = () => {
    if (recognitionInstance) {
      recognitionInstance.start();
    }
  };

  const showNextLetter = () => {
    if (currentLetterIndex < letters.length) {
      const letter = letters[currentLetterIndex];
      setuserSound(letter);
      giphyImage(letter);
      speakWord(letter);
      setShowLetters(true);
      setCurrentLetterIndex(currentLetterIndex + 1);
    }
  };
  //
  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    const grammar = new window.webkitSpeechGrammarList();

    grammar.addFromString(letters.join("  "), 1);
    recognition.grammars = grammar;

    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const letter = event.results[0][0].transcript.toLowerCase();
      setuserSound(letter);
      // if (letters.includes(letter)) {
      giphyImage(letter);
      speakWord(letter);
      speakWord(letter);
      // }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    setRecognitionInstance(recognition);
  }, []);

  const GiphysResponse = (props) => {
    const items = props.gifs.map((element) => {
      return (
        <div key={element.id}>
          <img src={element.url} alt="gifs" />
        </div>
      );
    });

    return <div>{items}</div>;
  };

  useEffect(() => {
    if (showLetters) {
      const timeInterval = setInterval(() => {
        setShowLetters(false);
        showNextLetter();
      }, 3000);
      clearInterval(timeInterval);
    }
  }, [showLetters, currentLetterIndex]);

  return (
    <>
      <div className="speech-recognition-practice">
        <h2>Voice Command Practice</h2>

        <button onClick={startSoundRecognition}>
          {" "}
          {/* first I tried to use the body.document.onclick to start the instance  */}
          Start Practice
        </button>
        <button onClick={showNextLetter}>Show Letter</button>
        <p>You said: {userSound}</p>
      </div>
      <div>
        {showLetters && (
          <div>
            <div key={letters[currentLetterIndex - 1]}>
              {letters[currentLetterIndex - 1]}
              <div>
                {results.length > 0 && <GiphysResponse gifs={results} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
// Replaced by giphy Api
// const fetchImage = async (letter) => {
//   try {
//     const response = await fetch(
//       `https://pixabay.com/api/?key=38701570-0befaa528a5e1f9f2fa4818cc&q=${letter}&image_type=photo`
//     );
//     const data = await response.json();
//     if (data.hits.length > 0) {
//       const image = data.hits[0].webformatURL;
//       setNewImage(image);
//       console.log("Image URL:", image);
//     }
//   } catch (error) {
//     console.error("Error fetching image:", error);
//   }
// }
