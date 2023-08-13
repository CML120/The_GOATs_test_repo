import React, { useState } from "react";
import SpellingGame from "./SpellingGame";
import PracticeLetter from "./practiceLetter";
import GameNavBar from "./GameNavBar";
import phoneticsPractice from "./phoneticsPractice";
import PlayGround from "./PlayGround";

function GameScreen() {
  const [activePage, setActivePage] = useState("Play Ground");

  let currentPage;
  if (activePage === "Play Ground") {
    currentPage = <PlayGround />;
  } else if (activePage === "Practice Letters") {
    currentPage = <PracticeLetter />;
  } else if (activePage === "Phonetics") {
    currentPage = <phoneticsPractice />;
  } else if (activePage === "Spelling Game") {
    currentPage = <SpellingGame />;
  }

  return (
    <div>
      <GameNavBar setActivePage={setActivePage} />
      {currentPage}
    </div>
  );
}

export default GameScreen;
