import './Keyboard.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  focusLost,
  keyDown,
  keyUp,
} from './KeyboardSlice';
import KeyboardKey from './KeyboardKey';
import KeyStrokeListener from '../Common/KeyStrokeListener';
import WindowEventListener from '../Common/WindowEventListener';

const Keyboard = () => {
  const dispatch = useDispatch();
  const keyMap = useSelector((state) => state.keyboard.keyMap);
  const keysDown = useSelector((state) => state.keyboard.keysDown);

  const createKey = (width, height, key, code) => ({
    width,
    height,
    key,
    code,
  });

  const keyWidth1 = 50;
  const keyWidth2 = 64;
  const keyHeight = 50;
  const keyboardMatrix = [
    [
      createKey(keyWidth1, keyHeight, '~', 'Backquote'),
      createKey(keyWidth1, keyHeight, '1', 'Digit1'),
      createKey(keyWidth1, keyHeight, '2', 'Digit2'),
      createKey(keyWidth1, keyHeight, '3', 'Digit3'),
      createKey(keyWidth1, keyHeight, '4', 'Digit4'),
      createKey(keyWidth1, keyHeight, '5', 'Digit5'),
      createKey(keyWidth1, keyHeight, '6', 'Digit6'),
      createKey(keyWidth1, keyHeight, '7', 'Digit7'),
      createKey(keyWidth1, keyHeight, '8', 'Digit8'),
      createKey(keyWidth1, keyHeight, '9', 'Digit9'),
      createKey(keyWidth1, keyHeight, '0', 'Digit0'),
      createKey(keyWidth1, keyHeight, '-', 'Minus'),
      createKey(keyWidth1, keyHeight, '+', 'Equal'),
      createKey(keyWidth1 + 40, keyHeight, 'Backspace', 'Backspace'),
    ],
    [
      createKey(keyWidth1 + 20, keyHeight, 'Tab', 'Tab'),
      createKey(keyWidth1, keyHeight, 'Q', 'KeyQ'),
      createKey(keyWidth1, keyHeight, 'W', 'KeyW'),
      createKey(keyWidth1, keyHeight, 'E', 'KeyE'),
      createKey(keyWidth1, keyHeight, 'R', 'KeyR'),
      createKey(keyWidth1, keyHeight, 'T', 'KeyT'),
      createKey(keyWidth1, keyHeight, 'Y', 'KeyY'),
      createKey(keyWidth1, keyHeight, 'U', 'KeyU'),
      createKey(keyWidth1, keyHeight, 'I', 'KeyI'),
      createKey(keyWidth1, keyHeight, 'O', 'KeyO'),
      createKey(keyWidth1, keyHeight, 'P', 'KeyP'),
      createKey(keyWidth1, keyHeight, '[', 'BracketLeft'),
      createKey(keyWidth1, keyHeight, ']', 'BracketRight'),
      createKey(keyWidth1 + 20, keyHeight, '\\', 'Backslash'),
    ],
    [
      createKey(keyWidth1 + 30, keyHeight, 'Caps Lock', 'CapsLock'),
      createKey(keyWidth1, keyHeight, 'A', 'KeyA'),
      createKey(keyWidth1, keyHeight, 'S', 'KeyS'),
      createKey(keyWidth1, keyHeight, 'D', 'KeyD'),
      createKey(keyWidth1, keyHeight, 'F', 'KeyF'),
      createKey(keyWidth1, keyHeight, 'G', 'KeyG'),
      createKey(keyWidth1, keyHeight, 'H', 'KeyH'),
      createKey(keyWidth1, keyHeight, 'J', 'KeyJ'),
      createKey(keyWidth1, keyHeight, 'K', 'KeyK'),
      createKey(keyWidth1, keyHeight, 'L', 'KeyL'),
      createKey(keyWidth1, keyHeight, ';', 'Semicolon'),
      createKey(keyWidth1, keyHeight, '\'', 'Quote'),
      createKey(keyWidth1 + 70, keyHeight, 'Enter', 'Enter'),
    ],
    [
      createKey(keyWidth1 + 60, keyHeight, 'Shift', 'ShiftLeft'),
      createKey(keyWidth1, keyHeight, 'Z', 'KeyZ'),
      createKey(keyWidth1, keyHeight, 'X', 'KeyX'),
      createKey(keyWidth1, keyHeight, 'C', 'KeyC'),
      createKey(keyWidth1, keyHeight, 'V', 'KeyV'),
      createKey(keyWidth1, keyHeight, 'B', 'KeyB'),
      createKey(keyWidth1, keyHeight, 'N', 'KeyN'),
      createKey(keyWidth1, keyHeight, 'M', 'KeyM'),
      createKey(keyWidth1, keyHeight, ',', 'Comma'),
      createKey(keyWidth1, keyHeight, '.', 'Period'),
      createKey(keyWidth1, keyHeight, '/', 'Slash'),
      createKey(keyWidth1 + 100, keyHeight, 'Shift', 'ShiftRight'),
    ],
    [
      createKey(keyWidth2, keyHeight, 'Ctrl', 'ControlLeft'),
      createKey(keyWidth2, keyHeight, 'OS', 'OSLeft'),
      createKey(keyWidth2, keyHeight, 'Alt', 'AltLeft'),
      createKey(keyWidth2 + 289, keyHeight, 'Space', 'Space'),
      createKey(keyWidth2, keyHeight, 'Alt', 'AltRight'),
      createKey(keyWidth2, keyHeight, 'OS', 'OSRight'),
      createKey(keyWidth2, keyHeight, 'Menu'),
      createKey(keyWidth2, keyHeight, 'Ctrl', 'ControlRight'),
    ],
  ];

  const keyGap = 10;
  const keyboardKeys = [];
  let svgViewBoxWidth = 0;
  let svgViewBoxHeight = 0;
  let xKeyOffset = keyGap;
  let yKeyOffset = keyGap;

  keyboardMatrix.forEach((row) => {
    // reset before rendering each row
    xKeyOffset = keyGap;

    row.forEach((r) => {
      const actionName = (r.code in keyMap) ? keyMap[r.code].note : '';
      const disabled = actionName === '';
      keyboardKeys.push(<KeyboardKey
        y={yKeyOffset}
        x={xKeyOffset}
        width={r.width}
        height={r.height}
        keyName={r.key}
        actionName={actionName}
        isDown={keysDown.includes(r.code)}
        disabled={disabled}
      />);

      // Update xKeyOffset so that the next key is rendered
      // to the right of the current key.
      xKeyOffset += keyGap + r.width;
      svgViewBoxWidth = Math.max(xKeyOffset, svgViewBoxWidth);
    });

    // Update yKeyOffset to render the next row below the row we
    // just finished rendering. We use keyHeight here assuming
    // that it is constant for all keys.
    yKeyOffset += keyGap + keyHeight;
    svgViewBoxHeight = Math.max(yKeyOffset, svgViewBoxHeight);
  });

  return (
    <WindowEventListener onBlur={() => dispatch(focusLost())}>
      <KeyStrokeListener
        onKeyUp={(code) => dispatch(keyUp(code))}
        onKeyDown={(code) => dispatch(keyDown(code))}
      >
        <svg viewBox={`0 0 ${svgViewBoxWidth} ${svgViewBoxHeight}`} className="keyboard-svg">
          {keyboardKeys}
        </svg>
      </KeyStrokeListener>
    </WindowEventListener>
  );
};

export default Keyboard;
