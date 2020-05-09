import React from 'react';

import Routes from "./Routes";
import Navbar from './components/Navbar';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <Routes />
    </div>
  );
}

export default App;
