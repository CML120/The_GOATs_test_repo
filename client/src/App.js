import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import SpellingGame from "./components/SpellingGame";
import PracticeLetter from "./components/practiceLetter";
import Navbar from "./components/Navbar";
import GameScreen from "./components/GameScreen";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Profile from "./components/pages/Profile";
import Home from "./components/pages/Home";
import Footer from "./components/Footer";

// import LetterPhonetics from "./components/phoneticsPractice";
const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div >
          <Navbar />

          <div>
            <GameScreen />
          </div>
          <div className="mainContainer">
            <Routes>
              {/* <Route
            path="/home"
            element={<Home />}
          /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
            path="/letters"
            element={<PracticeLetter />}
          />
          <Route
            path="/spellinggame"
            element={<SpellingGame />}
          />
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}
