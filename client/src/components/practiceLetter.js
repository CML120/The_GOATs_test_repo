import React, { useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import {
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import LetterGame, { AllLettersInOne } from "./LetterGame";

// import SpeechRecognitionComponent from "./SpeechRecognitionComponent";
// import SpellingGame from "./SpellingGame";

// https://balsamiq.cloud/s4ss2ue/pze1uia/r2278
export default function PracticeLetter() {
  const giphyApiKey = "AM5Vpj9SrOavAd2CktwDnrIjgpIuMe6j";
  const gf = new GiphyFetch(giphyApiKey);

  // State variables
  const [userSound, setUserSound] = useState("");
  const [results, setResults] = useState([]);
  const [recognitionInstance, setRecognitionInstance] = useState(null);
  const [showLetters, setShowLetters] = useState(false);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [showLetterButton, setShowLetterButton] = useState("Show Letter");

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

  // Component to display gifs
  const GiphysResponse = (props) => {
    const items = props.gifs.map((element) => {
      return (
        <div className="gify-display div" key={element.id}>
          <img src={element.url} alt="gifs" />
        </div>
      );
    });

    return <div>{items}</div>;
  };

  // Fetch and display gifs for a letter
  const giphyImage = async (letter) => {
    try {
      const response = await gf.animate(letter, { limit: 2 });

      setResults(response.data);
      // console.log("Response", response.data);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
      setResults([]);
    }
  };
  // Speak a letter using the speech synthesis API
  const speakWord = (letter) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(letter);
    speechSynthesis.speak(utterance);
  };
  // Start sound recognition
  const startSoundRecognition = () => {
    if (recognitionInstance) {
      recognitionInstance.start();
    }
  };

  //Set up speech recognition
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
      console.log(letter);

      // ??????????????????????
      if (letters.includes(letter.charAt(0))) {
        soundGenerator(letter);
      } else {
        return <div>Try again</div>;
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    setRecognitionInstance(recognition);

    return () => {
      if (recognitionInstance) {
        recognition.stop();
      }
    };
  }, []);
  //Generate sound
  const soundGenerator = (letter) => {
    setUserSound(letter);
    giphyImage(letter); //not working???
    speakWord(letter);
    speakWord(letter);
  };
  //Triggers the soundGenerator function
  useEffect(
    (letter) => {
      if (userSound && letters.includes(letter)) {
        soundGenerator(letter);
        setUserSound(letter);
      }
    },
    [userSound]
  );

  // Show next letter and associated gifs
  const showNextLetter = () => {
    if (currentLetterIndex < letters.length) {
      const letter = letters[currentLetterIndex];
      soundGenerator(letter);
      setShowLetters(true);
      setCurrentLetterIndex(currentLetterIndex + 1);
    }
  };
  // Handle the show letter button click
  const showLetterHandler = () => {
    if (showLetterButton === "Show Letter") {
      showNextLetter();
      setShowLetterButton("Stop Listening");
    } else {
      recognitionInstance.stop();
      setShowLetterButton("Show Letter");
      setShowLetters(false);
      giphyImage("");
    }
  };
  // timer to move to the next letter
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
    <div className="box-wrapper">
      <Tabs className="tab-container">
        <TabList style={{ flexWrap: "wrap", justifyContent: "center" }}>
          <Tab>Learn All Letters</Tab>
          <Tab>Learn the Sound</Tab>
          <Tab>Practice the Sound</Tab>

          <Tab>Test Yourselves</Tab>
        </TabList>

        <TabPanels style={{ flexWrap: "wrap", justifyContent: "center" }}>
          <TabPanel className="each-tabPanel">
            <h5>Welcome!</h5>
            <p>
              Your first step begins here to be a G.R.O.A.T GOAT (Greatest
              Reader Of All Time)
            </p>
            <p>
              Learn the letters, and you can also press each letter to listen to
              its sound
            </p>
            <div id="allLettersInOne-div">
              <AllLettersInOne letters={letters} onClick={soundGenerator} />
            </div>
          </TabPanel>
          <TabPanel className="each-tabPanel">
            <>
              <h5>Welcome! </h5>
              <p>
                {" "}
                Here you are going to learn the sound of all letters in just one
                click{" "}
              </p>
              <Button onClick={showLetterHandler}>{showLetterButton}</Button>

              <div>
                {showLetters && (
                  <div>
                    <div key={letters[currentLetterIndex - 1]}>
                      {letters[currentLetterIndex - 1]}
                      <div>
                        {results.length > 0 && (
                          <GiphysResponse gifs={results} />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          </TabPanel>

          <TabPanel className="each-tabPanel">
            <div className="speech-recognition-practice">
              <h2>Voice Command Practice</h2>
              <p>
                Get closer to the microphone, click the start button, and speak
                out the letter randomly.
              </p>
              <p>You will heer back your sound...</p>

              <Button
                colorScheme="teal"
                size="lg"
                onClick={startSoundRecognition}
              >
                {" "}
                Start Practice
              </Button>
              <p>It sounds: {userSound}</p>
            </div>
            <div>{results.length > 0 && <GiphysResponse gifs={results} />}</div>
          </TabPanel>

          <TabPanel className="each-tabPanel">
            <h5>Guess the Next Letter </h5>
            <LetterGame letters={letters} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
