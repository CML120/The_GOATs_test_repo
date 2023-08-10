import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import "./App.css";
import SpellingGame from "./components/SpellingGame";
import PracticeLetter from "./components/practiceLetter";
import Navbar from "./components/Navbar";
import LetterPhonetics from "./components/phoneticsPractice";
const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache()
})


export default function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Navbar />
      </div>
      <div>
        <SpellingGame />
      </div>
      <div>
        <PracticeLetter />
      </div>
      <div>
        <LetterPhonetics />
      </div>
    </ApolloProvider>
  );
}
