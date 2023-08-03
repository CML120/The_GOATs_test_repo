// Import the necessary dependencies
import React from 'react';
import logo from './logo.svg';
import './App.css';

// Define the App component
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Insert your logo image */}
        <img src={logo} className="App-logo" alt="logo" />

        {/* Display a message */}
        <p>
          
        </p>

        {/* Add a link to the ReactJS website */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
