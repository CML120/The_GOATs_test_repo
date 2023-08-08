// pixabayApiKey = 38701570-0befaa528a5e1f9f2fa4818cc

import React, { useEffect, useState } from "react";

// https://balsamiq.cloud/s4ss2ue/pze1uia/r2278
export default function PracticeLetter() {
  const [userSound, setuserSound] = useState("");
  const [recognitionInstance, setRecognitionInstance] = useState(null);

  const letters = ["a", "b", "c", "d", "e"];

  const [newImage, setNewImage] = useState("");

  useEffect(() => {
    const fetchImage = async (letter) => {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=38701570-0befaa528a5e1f9f2fa4818cc&q=${letter}&image_type=photo`
        );
        const data = await response.json();
        if (data.hits.length > 0) {
          const image = data.hits[0].webformatURL;
          setNewImage(image);
          console.log("Image URL:", image);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    // const recognition =  new window.SpeechRecognition || new window.webkitSpeechRecognition;
    // const grammar = new window.SpeechGrammarList || new window.webkitSpeechGrammarList

    // ???? the above SpeechRecognition and SpeechGrammarList instances of the Web Api not working on my browsers, so i removed them

    const recognition = new window.webkitSpeechRecognition();
    const grammar = new window.webkitSpeechGrammarList();

    grammar.addFromString(letters.join("  "), 1);
    recognition.grammars = grammar;

    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // document.body.onclick = () => {
    //   recognition.start();
    // };

    recognition.onresult = (event) => {
      const letter = event.results[0][0].transcript.toLowerCase();
      setuserSound(letter);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    setRecognitionInstance(recognition);

    // return () => {
    //   recognition.abort(); //or recognition.stop() ??????
    // };

    fetchImage(userSound);
    
  }, [userSound]);

  return (
    <>
      <div className="speech-recognition-practice">
        <h2>Voice Command Practice</h2>

        <button onClick={() => recognitionInstance.start()}>
          {" "}
          {/* first I tried to use the body.document.onclick to start the instance  */}
          Start Practice
        </button>
        <p>You said: {userSound}</p>
      </div>
      <div>{newImage && <img src={newImage} alt="test-flower image" />}</div>
    </>
  );
}
