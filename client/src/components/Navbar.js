import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <section id="navbar" className="">
            <header className="row">
                <h1>ABC GOAT</h1>
                <ul className="row">
                <li>
                        <Link className="nav-item" to="/home">
                            Home
                        </Link>
                    </li>
                    <li> <Link className="nav-item" to="/login">
                        Login
                    </Link>
                    </li>
                    <li>
                        <Link className="nav-item" to="/signup">
                            Signup
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-item" to="/profile">
                            My profile
                        </Link>
                    </li>
                </ul>
            </header>
        </section>
    );
}

export default Navbar;