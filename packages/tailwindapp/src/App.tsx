import React from 'react';
import logo from './logo.svg';
import './App.css';
import FigureContainer from './Molecules/FigureContainer';
import SoftlineSelection from './Molecules/SoftlineSelection';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FigureContainer />
        <SoftlineSelection />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
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
