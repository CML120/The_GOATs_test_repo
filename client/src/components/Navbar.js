import React from "react";

function Navbar() {
    return (
        <section id="navbar" className="">
            <header className="row">
                <h1>ABC GOAT</h1>
                <ul className="row">
                <li id="navbar-items" className="nav-item">
                        <a id="navbar-menu" class="" href="/">
                            Home
                        </a>
                    </li>
                    <li id="navbar-items" className="nav-item">
                        <a id="navbar-menu" class="" href="/signup">
                            Sign Up!
                        </a>
                    </li>
                    <li id="navbar-items" className="nav-item">
                        <a id="navbar-menu" class="" href="/login">
                            Login
                        </a>
                    </li>
                    <li id="navbar-items" className="nav-item">
                        <a id="navbar-menu" class="" href="/profile">
                            Profile
                        </a>
                    </li>
                    <li id="navbar-items" className="nav-item">
                        <a id="navbar-menu" class="" href="/">
                            Logout
                        </a>
                    </li>
                </ul>
            </header>
        </section>
    );
}

export default Navbar;