import './App.css';
import React from 'react';
import KeyboardKey from '../Feature/Keyboard/KeyboardKey.js';
import * as Tone from 'tone';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.synth = new Tone.PolySynth(Tone.Synth).toDestination();

    // TODO: make this configurable
    this.baseOctave = 3;

    // Setup the keyboard mappings
    this.keyMap = new Map();
    this.keyMap.set("KeyA", "A" + this.baseOctave);
    this.keyMap.set("KeyW", "A#" + this.baseOctave);
    this.keyMap.set("KeyS", "B" + this.baseOctave);
    this.keyMap.set("KeyE", "B#" + this.baseOctave);
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

  componentDidMount() {
    document.addEventListener("keydown", this.appKeyDown);
  }

  componentWillUnmount() {
    // TODO: remove keydown event
  }

  appKeyDown(e) {
    if (this.keyMap.has(e.code)) {
      const note = this.keyMap.get(e.code);
      console.log(`Playing ${note} ...`);
      this.synth.triggerAttackRelease(note, "8n");
    }
  }

  render() {

    const keyboardKeys = Array.from(this.keyMap)
      .map(([keyName, note]) => {
        return <KeyboardKey key={keyName} keyName={keyName} note={note} /> 
      })

    return (
      <div className="App">
        <header className="App-header">
          <label htmlFor="octave-select">Octave</label>
          <select id="octave-select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>

          <div class="App-keyboard-container">{keyboardKeys}</div>
        </header>
      </div>
    );
  };
}

export default App;
