import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import "./App.css";
import "./components/practiceLetter.css"
import SpellingGame from "./components/SpellingGame";
import PracticeLetter from "./components/practiceLetter";
import Navbar from "./components/Navbar";
import GameScreen from "./components/GameScreen";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Profile from "./components/pages/Profile";
import Home from "./components/pages/Home";
import Footer from "./components/Footer";

const httpLink = createHttpLink({
  uri: 'http://www.localhost:3001/graphql',
  });
// import LetterPhonetics from "./components/phoneticsPractice";
const client = new ApolloClient({
  // uri: "/graphql",
  link: httpLink,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Navbar />

          <div className="mainContainer">
            <div>
              <GameScreen />
            </div>
            <div className="contentOnly">
              <Routes>
                {/* <Route
            path="/home"
            element={<Home />}
          /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/letters" element={<PracticeLetter />} />
                <Route path="/spellinggame" element={<SpellingGame />} />
              </Routes>
            </div>
          </div>

          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}
