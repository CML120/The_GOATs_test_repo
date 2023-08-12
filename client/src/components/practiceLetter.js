import React, { useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Button, ButtonGroup } from "@chakra-ui/react";
import LetterGame, { AllLettersInOne } from "./LetterGame";
// import SpeechRecognitionComponent from "./SpeechRecognitionComponent";
// import SpellingGame from "./SpellingGame";

// https://balsamiq.cloud/s4ss2ue/pze1uia/r2278
export default function PracticeLetter() {
  const giphyApiKey = "AM5Vpj9SrOavAd2CktwDnrIjgpIuMe6j";
  const gf = new GiphyFetch(giphyApiKey);

  const [userSound, setUserSound] = useState("");
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
      const letter = event.results[0][0].transcript.toUpperCase();
      setUserSound(letter);
      // if (letters.includes(letter)) {

      // }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    setRecognitionInstance(recognition);
  }, []);

  const soundGenerator = (letter) => {
    setUserSound(letter);
    giphyImage(letter); //not working???
    speakWord(letter);
    speakWord(letter);
  };

  useEffect(() => {
    if (userSound && letters.includes(userSound)) {
      soundGenerator(userSound); //nosound
      // giphyImage(letter); //not working???
      // speakWord(letter);
      // speakWord(letter);
    }
  }, []);

  const showNextLetter = () => {
    if (currentLetterIndex < letters.length) {
      const letter = letters[currentLetterIndex];
      // setUserSound(letter);
      giphyImage(letter);
      speakWord(letter);
      speakWord(letter);
      setShowLetters(true);
      setCurrentLetterIndex(currentLetterIndex + 1);
    }

    // else if (currentLetterIndex === letters.length - 1) {
    //   speakWord("yeeeeee");
    //   setShowLetters(false);
    // }
  };

  const showLetterHandler = () => {
    setShowLetters(true);
    showNextLetter();
  };

  useEffect(() => {
    if (showLetters) {
      const timeOut = setTimeout(() => {
        setShowLetters(false);
        if (currentLetterIndex < letters.length) {
          showNextLetter();
        }
      }, 3000);
      return () => clearTimeout(timeOut);
    }
  }, [showLetters, currentLetterIndex]);

  return (
    <div>
      <div className="speech-recognition-practice">
        <h2>Voice Command Practice</h2>

        <Button colorScheme="teal" size="lg" onClick={startSoundRecognition}>
          {" "}
          {/* first I tried to use the body.document.onclick to start the instance  */}
          Start Practice
        </Button>
        <Button onClick={showLetterHandler}>Show Letter</Button>
        <p>It sounds: {userSound}</p>
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
      <div>
        <LetterGame />
      </div>
      <div>
        <AllLettersInOne letters={letters} onClick={soundGenerator} />
      </div>
    </div>
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
