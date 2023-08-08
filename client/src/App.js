import React from "react";
import "./App.css";
import SpellingGame from "./components/SpellingGame";
import PracticeLetter from "./components/practiceLetter";
import Navbar from "./components/Navbar"

function App() {
  return (
    <>
    <div>
      <Navbar />
    </div>
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
