import './App.css';
import React from 'react';
import Keyboard from '../Features/Keyboard/Keyboard';
import OctaveDropDown from '../Features/Keyboard/OctaveDropDown';

const App = () => (
  <div className="App">
    <h1>Keyboard</h1>
    <Keyboard />
    <h2>Options</h2>
    <OctaveDropDown />
  </div>
);

export default App;
