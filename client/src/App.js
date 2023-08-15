import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
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
import PlayGround from "./components/PlayGround";
import { Box } from "@chakra-ui/react";
import Contact from "./components/Contact";

const httpLink = createHttpLink({
  uri: "http://www.localhost:3001/graphql",
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
            <Box
              p={1}
              width="100%"
              mx={{ base: 0, md: 4 }}
              pr={{ base: 0, md: 0 }}
            >
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/letters" element={<PracticeLetter />} />
                <Route path="/spellinggame" element={<SpellingGame />} />
                <Route path="/playground" element={<PlayGround />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Box>
          </div>

          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}
