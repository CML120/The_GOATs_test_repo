// import React from "react";
// import "./GameNavBar.css"; // Import your CSS file for styling

// function GameNavBar({ setActivePage }) {
//   const handleNavClick = (page) => {
//     setActivePage(page);
//   };

//   return (
//     <section id="gamenavbar" className="center">
//       <header className="row">
//         <ul className="row">
//           <li id="gamenavbar-items" className="gamenav-item">
//             <a
//               id="gamenavbar-menu"
//               href="/"
//               onClick={(e) => {
//                 e.preventDefault();
//                 handleNavClick("Play Ground");
//               }}
//             >
//               Play Ground
//             </a>
//           </li>
//           <li id="gamenavbar-items" className="gamenav-item">
//             <a
//               id="gamenavbar-menu"
//               href="/signup"
//               onClick={(e) => {
//                 e.preventDefault();
//                 handleNavClick("Practice Letters");
//               }}
//             >
//               Practice Letters
//             </a>
//           </li>
//           <li id="gamenavbar-items" className="gamenav-item">
//             <a
//               id="gamenavbar-menu"
//               href="/login"
//               onClick={(e) => {
//                 e.preventDefault();
//                 handleNavClick("Phonetics");
//               }}
//             >
//               Phonetics
//             </a>
//           </li>
//           <li id="gamenavbar-items" className="gamenav-item">
//             <a
//               id="gamenavbar-menu"
//               href="/profile"
//               onClick={(e) => {
//                 e.preventDefault();
//                 handleNavClick("Spelling Game");
//               }}
//             >
//               Spelling Game
//             </a>
//           </li>
//         </ul>
//       </header>
//     </section>
//   );
// }

// export default GameNavBar;

import React from "react";
import "./GameNavBar.css"; // Import your CSS file for styling
import { Link } from "react-router-dom";

function GameNavBar() {
  return (
    <section id="gamenavbar" className="center">
      <header className="row">
        <li >
          <Link  to="/">
            Play Ground
          </Link>
        </li>
        <li >
          <Link id="gamenavbar-items" className="gamenav-item" to="/letters">
            Practice Letters
          </Link>
        </li>
        <li >
          <Link id="gamenavbar-items" className="gamenav-item" to="/phonetics">
            Phonetics
          </Link>
        </li>
        <li >
          <Link id="gamenavbar-items" className="gamenav-item" to="/spellinggame">
            Spelling Game
          </Link>
        </li>
      </header>
    </section>
  );
}

export default GameNavBar;
