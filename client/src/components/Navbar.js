import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Tooltip } from "@chakra-ui/react";

function Navbar() {
  return (
    <section id="navbar">
      <header className="row">
        <Tooltip label="Go to home" placement="bottom-end">
          <Link to="/">
            <h1>ABC GOAT</h1>
          </Link>
        </Tooltip>

        <Breadcrumb separator="|">
          <BreadcrumbItem>
            <Link className="nav-item" to="/home">
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            {" "}
            <Link className="nav-item" to="/login">
              Login
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link className="nav-item" to="/signup">
              Signup
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link className="nav-item" to="/profile">
              My profile
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </header>
    </section>
  );
}

export default Navbar;

// import React from "react";
// import "./Navbar.css";
// import { Link } from "react-router-dom";
// import { Tooltip } from "@chakra-ui/react";

// function Navbar() {
//   return (
//     <section id="navbar" className="">
//       <header className="row">
//         <Tooltip label="Go to home" placement="bottom-end">
//           <Link to="/">
//             <h1>ABC GOAT</h1>
//           </Link>
//         </Tooltip>

//         <ul className="row">
//           <li>
//             <Link className="nav-item" to="/home">
//               Home
//             </Link>
//           </li>
//           <li>
//             {" "}
//             <Link className="nav-item" to="/login">
//               Login
//             </Link>
//           </li>
//           <li>
//             <Link className="nav-item" to="/signup">
//               Signup
//             </Link>
//           </li>
//           <li>
//             <Link className="nav-item" to="/profile">
//               My profile
//             </Link>
//           </li>
//         </ul>
//       </header>
//     </section>
//   );
// }

// export default Navbar;
