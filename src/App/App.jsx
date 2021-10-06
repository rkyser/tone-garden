import './App.css';
import React from 'react';
import Keyboard from '../Features/Keyboard/Keyboard';
import OctaveSetting from '../Features/Keyboard/OctaveSetting';
import PlayModeSetting from '../Features/Keyboard/PlayModeSetting';

const App = () => (
  <div className="page-container">
    <div className="page-header">
      <h1>🎵 Tone Garden 🎵</h1>
    </div>
    <div className="page-sidebar">
      <div>
        <OctaveSetting />
        <PlayModeSetting />
      </div>
      <div>
        <Keyboard />
      </div>
    </div>
  </div>
);

export default App;
