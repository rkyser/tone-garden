import './App.css';
import React from 'react';
import Keyboard from '../Features/Keyboard/Keyboard';
import OctaveDropDown from '../Features/Keyboard/OctaveDropDown';
import KeyboardModeDropDown from '../Features/Keyboard/KeyboardModeDropDown';

const App = () => (
  <div className="with-sidebar">
    <div>
      <h2>Options</h2>
      <OctaveDropDown />
      <KeyboardModeDropDown />
    </div>
    <div>
      <h1>Keyboard</h1>
      <Keyboard />
    </div>
  </div>
);

export default App;
