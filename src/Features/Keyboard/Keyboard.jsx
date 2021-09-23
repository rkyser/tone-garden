import './Keyboard.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { keyDown, keyUp } from './KeyboardSlice';
import KeyboardKey from './KeyboardKey';
import KeyStrokeListener from '../Common/KeyStrokeListener';

const Keyboard = () => {
  const dispatch = useDispatch();
  const keyMap = useSelector((state) => state.keyboard.keyMap);
  const keyboardKeys = Array.from(keyMap)
    .map(([keyName, note]) => (<KeyboardKey key={keyName} keyName={keyName} note={note} />));

  return (
    <KeyStrokeListener
      onKeyUp={(code) => dispatch(keyUp(code))}
      onKeyDown={(code) => dispatch(keyDown(code))}
    >
      <div className="Keyboard-container">
        {keyboardKeys}
      </div>
    </KeyStrokeListener>
  );
};

export default Keyboard;
