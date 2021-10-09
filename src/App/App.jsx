import './App.css';
import React, { useEffect } from 'react';
import Keyboard from '../Features/Keyboard/Keyboard';
import OctaveSetting from '../Features/Keyboard/OctaveSetting';
import PlayModeSetting from '../Features/Keyboard/PlayModeSetting';
import InstrumentSetting from '../Features/Keyboard/InstrumentSetting';

const App = () => {
  useEffect(() => {
    document.title = 'Tone Garden';
  });
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🎵 Tone Garden</h1>
      </div>
      <div className="page-sidebar">
        <div>
          <OctaveSetting />
          <PlayModeSetting />
          <InstrumentSetting />
        </div>
        <div>
          <Keyboard />
        </div>
      </div>
    </div>
  );
};

export default App;
