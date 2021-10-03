import { createSlice } from '@reduxjs/toolkit';
import * as Tone from 'tone';

const PLAYMODE_CONTINUOUS = 'PLAYMODE_CONTINUOUS';
const PLAYMODE_TOGGLE = 'PLAYMODE_TOGGLE';
const PLAYMODE_PLUCK = 'PLAYMODE_PLUCK';

const keyMapping = (keyCode, note, offset) => ({ keyCode, note, offset });
const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState: {
    keyMap: {
      KeyA: keyMapping('KeyA', 'A', 0),
      KeyW: keyMapping('KeyW', 'A#', 0),
      KeyS: keyMapping('KeyS', 'B', 0),
      KeyE: keyMapping('KeyE', 'B#', 0),
      KeyD: keyMapping('KeyD', 'C', 1),
      KeyR: keyMapping('KeyR', 'C#', 1),
      KeyF: keyMapping('KeyF', 'D', 1),
      KeyT: keyMapping('KeyT', 'D#', 1),
      KeyG: keyMapping('KeyG', 'E', 1),
      KeyH: keyMapping('KeyH', 'F', 1),
      KeyU: keyMapping('KeyU', 'F#', 1),
      KeyJ: keyMapping('KeyJ', 'G', 1),
      KeyI: keyMapping('KeyI', 'G#', 1),
      KeyK: keyMapping('KeyK', 'A', 1),
      KeyO: keyMapping('KeyO', 'A#', 1),
      KeyL: keyMapping('KeyL', 'B', 1),
    },
    keysDown: [],
    octave: 1,
    octaveOptions: [0, 1, 2, 3, 4, 5],
    synth: new Tone.PolySynth(Tone.DuoSynth).toDestination(),
    playmode: {
      current: PLAYMODE_CONTINUOUS,
      options: [PLAYMODE_TOGGLE, PLAYMODE_CONTINUOUS, PLAYMODE_PLUCK],
    },
  },
  reducers: {
    keyDown(state, action) {
      const keyCode = action.payload;
      state.keysDown.push(keyCode);

      const mapping = state.keyMap[keyCode];
      if (mapping) {
        const noteWithOctave = `${mapping.note}${state.octave + mapping.offset}`;
        state.synth.triggerAttack(noteWithOctave, Tone.now());
      }
    },
    keyUp(state, action) {
      const keyCode = action.payload;
      const index = state.keysDown.indexOf(keyCode);
      if (index > -1) {
        state.keysDown.splice(index, 1);
      }
      const mapping = state.keyMap[keyCode];
      if (mapping) {
        const noteWithOctave = `${mapping.note}${state.octave + mapping.offset}`;
        state.synth.triggerRelease(noteWithOctave, Tone.now());
        // eslint-disable-next-line no-console
        console.log(`RELEASE ${noteWithOctave}`);
      }
    },
    setOctave(state, action) {
      const parsedOctave = parseInt(action.payload, 10);
      if (Number.isNaN(parsedOctave)) {
        return;
      }
      if (state.octaveOptions.includes(parsedOctave)) {
        state.octave = parsedOctave;
      }
    },
    setPlaymode(state, action) {
      const playmode = action.payload;
      if (state.playmode.options.includes(playmode)) {
        state.playmode.current = playmode;
      }
    },
  },
});

export const {
  keyDown,
  keyUp,
  setOctave,
  setPlaymode,
} = keyboardSlice.actions;
export default keyboardSlice.reducer;
