import './App.css';
import React from 'react';
import Keyboard from '../Features/Keyboard/Keyboard';

class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <h1>Keyboard</h1>
        <Keyboard />
      </div>
    );
  }
}

export default App;
