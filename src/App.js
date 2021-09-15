import logo from './logo.svg';
import './App.css';
import React from 'react';
import * as Tone from 'tone'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.synth = new Tone.PolySynth(Tone.Synth).toDestination();

    // TODO: make this configurable
    this.baseOctave = 4;

    // Setup the keyboard mappings
    this.keyMap = new Map();
    this.keyMap.set("KeyA", "A" + this.baseOctave);
    this.keyMap.set("KeyW", "A#" + this.baseOctave);
    this.keyMap.set("KeyS", "B" + this.baseOctave);
    this.keyMap.set("KeyD", "C" + (this.baseOctave + 1));
    this.keyMap.set("KeyR", "C#" + (this.baseOctave + 1));
    this.keyMap.set("KeyF", "D" + (this.baseOctave + 1));
    this.keyMap.set("KeyT", "D#" + (this.baseOctave + 1));
    this.keyMap.set("KeyG", "E" + (this.baseOctave + 1));
    this.keyMap.set("KeyH", "F" + (this.baseOctave + 1));
    this.keyMap.set("KeyU", "F#" + (this.baseOctave + 1));
    this.keyMap.set("KeyJ", "G" + (this.baseOctave + 1));
    this.keyMap.set("KeyI", "G#" + (this.baseOctave + 1));
    this.keyMap.set("KeyK", "A" + (this.baseOctave + 1));
    this.keyMap.set("KeyO", "A#" + (this.baseOctave + 1));
    this.keyMap.set("KeyL", "B" + (this.baseOctave + 1));

    // This binding is necessary to make `this` work in the callback    
    this.appKeyDown = this.appKeyDown.bind(this);  
  }

  appKeyDown(e) {
    if (this.keyMap.has(e.code)) {
      const note = this.keyMap.get(e.code);
      console.log(`Playing ${note} ...`);
      this.synth.triggerAttackRelease(note, "8n");
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <input onKeyDown={this.appKeyDown}></input>
        </header>
      </div>
    );
  };
}

export default App;
