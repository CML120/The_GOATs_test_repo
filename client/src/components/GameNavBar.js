import React from "react";
import "./GameNavBar.css"; // Import your CSS file for styling

function GameNavBar({ setActivePage }) {
  const handleNavClick = (page) => {
    setActivePage(page);
  };

  return (
    <section id="gamenavbar" className="center">
      <header className="row">
        <li >
          <Link id="gamenavbar-items" className="gamenav-item"  to="/playground">
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

// import React from "react";
// import "./GameNavBar.css"; // Import your CSS file for styling
// import { Link } from "react-router-dom";

// function GameNavBar() {
//   return (
//     <section id="gamenavbar" className="center">
//       <header className="row">
//         <li >
//           <Link  to="/">
//             Play Ground
//           </Link>
//         </li>
//         <li >
//           <Link id="gamenavbar-items" className="gamenav-item" to="/letters">
//             Practice Letters
//           </Link>
//         </li>
//         <li >
//           <Link id="gamenavbar-items" className="gamenav-item" to="/phonetics">
//             Phonetics
//           </Link>
//         </li>
//         <li >
//           <Link id="gamenavbar-items" className="gamenav-item" to="/spellinggame">
//             Spelling Game
//           </Link>
//         </li>
//       </header>
//     </section>
//   );
// }

// export default GameNavBar;
