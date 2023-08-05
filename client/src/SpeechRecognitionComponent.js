import React, { useState, useEffect } from 'react';
import annyang from 'annyang';

const SpeechRecognitionComponent = ({ handleSpokenWord }) => {
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (annyang) {
      const commands = {
        '*word': (word) => handleSpokenWord(word),
      };
      annyang.addCommands(commands);
    }
  }, [handleSpokenWord]);

  const toggleListening = () => {
    if (listening) {
      annyang.abort();
    } else {
      annyang.start();
    }
    setListening(!listening);
  };

  return (
    <div>
      <button onClick={toggleListening}>
        {listening ? 'Stop Microphone' : 'Start Microphone'}
      </button>
    </div>
  );
};

export default SpeechRecognitionComponent;
