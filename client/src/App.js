import React from "react";
import "./App.css";
import SpellingGame from "./components/SpellingGame";
import PracticeLetter from "./components/practiceLetter";

function App() {
  return (
    <>
      <div>
        <SpellingGame />
      </div>
      <div>
        <PracticeLetter />
      </div>
    </>
  );
}

export default App;
