import { createSlice } from '@reduxjs/toolkit';

const baseOctave = 2;
const keyMap = new Map();
keyMap.set('KeyA', `A${baseOctave}`);
keyMap.set('KeyW', `A#${baseOctave}`);
keyMap.set('KeyS', `B${baseOctave}`);
keyMap.set('KeyE', `B#${baseOctave}`);
keyMap.set('KeyD', `C${baseOctave + 1}`);
keyMap.set('KeyR', `C#${baseOctave + 1}`);
keyMap.set('KeyF', `D${baseOctave + 1}`);
keyMap.set('KeyT', `D#${baseOctave + 1}`);
keyMap.set('KeyG', `E${baseOctave + 1}`);
keyMap.set('KeyH', `F${baseOctave + 1}`);
keyMap.set('KeyU', `F#${baseOctave + 1}`);
keyMap.set('KeyJ', `G${baseOctave + 1}`);
keyMap.set('KeyI', `G#${baseOctave + 1}`);
keyMap.set('KeyK', `A${baseOctave + 1}`);
keyMap.set('KeyO', `A#${baseOctave + 1}`);
keyMap.set('KeyL', `B${baseOctave + 1}`);

const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState: {
    keyMap,
    keysDown: [],
    octave: 2,
  },
  reducers: {
    keyDown(state, keyCode) {
      state.keysDown.push(keyCode);
    },
    keyUp(state, keyCode) {
      const index = state.keysDown.indexOf(keyCode);
      if (index > -1) {
        state.keysDown.splice(index, 1);
      }
    },
  },
});

export const { keyDown, keyUp } = keyboardSlice.actions;
export default keyboardSlice.reducer;
