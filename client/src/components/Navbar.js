import React from "react";

function Navbar() {
    return (
        <section id="navbar" className="">
            <header className="row">
                <h1>ABC GOAT</h1>
                <ul className="row">
                    <li id="navbar-items" className="nav-item">
                        <a>
                            Sign Up!
                        </a>
                    </li>
                    <li id="navbar-items" className="nav-item">
                        <a>
                            Login
                        </a>
                    </li>
                    <li id="navbar-items" className="nav-item">
                        <a>
                            Profile
                        </a>
                    </li>
                    <li id="navbar-items" className="nav-item">
                        <a>
                            Logout
                        </a>
                    </li>
                </ul>
            </header>
        </section>
    );
}

export default Navbar;