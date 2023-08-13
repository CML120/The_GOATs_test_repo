import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Tooltip } from "@chakra-ui/react";

const style = {
  logoImage: {
    maxWidth: "4rem",
  },
};
function Navbar() {
  return (
    <section id="navbar">
      <header className="row">
        <Tooltip label="Go to home" placement="bottom-end">
          <Link to="/">
            <img src="/images/logo.png" style={style.logoImage} />
            <h1>ABC GOAT</h1>
          </Link>
        </Tooltip>
        <div className="nav-descriptive-image">
          <img src="/images/abc-top.png" />
        </div>

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
