import { createSlice } from '@reduxjs/toolkit';
import * as Tone from 'tone';

const INSTRUMENT_FM_SYNTH = 'FM_SYNTH';
const INSTRUMENT_AM_SYNTH = 'AM_SYNTH';
const INSTRUMENT_DUO_SYNTH = 'DUO_SYNTH';
const PLAYMODE_CONTINUOUS = 'PLAYMODE_CONTINUOUS';
const PLAYMODE_TOGGLE = 'PLAYMODE_TOGGLE';
const PLAYMODE_PLUCK = 'PLAYMODE_PLUCK';

const setting = (display, value) => ({ display, value });
const keyMapping = (keyCode, note, offset) => ({ keyCode, note, offset });
const createInstrument = (instrument) => {
  switch (instrument) {
    case INSTRUMENT_FM_SYNTH:
      return new Tone.PolySynth(Tone.FMSynth).toDestination();
    case INSTRUMENT_AM_SYNTH:
      return new Tone.PolySynth(Tone.AMSynth).toDestination();
    case INSTRUMENT_DUO_SYNTH:
      return new Tone.PolySynth(Tone.DuoSynth).toDestination();
    default:
      // TODO: throw exception?
      return null;
  }
};
const createToggledAttack = (keyCode, noteWithOctave) => ({ keyCode, noteWithOctave });

const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState: {
    keyMap: {
      KeyQ: keyMapping('KeyQ', 'G#', 0),
      KeyA: keyMapping('KeyA', 'A', 0),
      KeyW: keyMapping('KeyW', 'A#', 0),
      KeyS: keyMapping('KeyS', 'B', 0),
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
      Semicolon: keyMapping('Semicolon', 'C', 2),
    },
    keysDown: [],
    octave: 2,
    octaveRange: { min: 0, max: 5 },
    synth: createInstrument(INSTRUMENT_FM_SYNTH),
    toggledAttacks: [],
    playmode: {
      current: setting('Continuous', PLAYMODE_CONTINUOUS),
      options: [
        setting('Toggle', PLAYMODE_TOGGLE),
        setting('Continuous', PLAYMODE_CONTINUOUS),
        setting('Pluck', PLAYMODE_PLUCK),
      ],
    },
    instrument: {
      current: setting('FM Synth', INSTRUMENT_FM_SYNTH),
      options: [
        setting('FM Synth', INSTRUMENT_FM_SYNTH),
        setting('AM Synth', INSTRUMENT_AM_SYNTH),
        setting('Duo Synth', INSTRUMENT_DUO_SYNTH),
      ],
    },
  },
  reducers: {
    focusLost(state) {
      state.keysDown.splice(0, state.keysDown.length);
      state.synth.releaseAll();
    },
    keyDown(state, action) {
      const keyCode = action.payload;
      state.keysDown.push(keyCode);

      const mapping = state.keyMap[keyCode];
      if (!mapping) {
        return;
      }

      const noteWithOctave = `${mapping.note}${state.octave + mapping.offset}`;
      const noteActiveIndex = state.toggledAttacks
        .findIndex((a) => a.noteWithOctave === noteWithOctave);

      switch (state.playmode.current.value) {
        case PLAYMODE_TOGGLE:
          if (noteActiveIndex > -1) {
            state.synth.triggerRelease(noteWithOctave, Tone.now());
            state.toggledAttacks.splice(noteActiveIndex, 1);
          } else {
            state.synth.triggerAttack(noteWithOctave, Tone.now());
            state.toggledAttacks.push(createToggledAttack(keyCode, noteWithOctave));
          }
          break;

        case PLAYMODE_CONTINUOUS:
          state.synth.triggerAttack(noteWithOctave, Tone.now());
          break;

        case PLAYMODE_PLUCK:
          state.synth.triggerAttackRelease(noteWithOctave, '8n', Tone.now());
          break;

        default:
          break;
      }
    },
    keyUp(state, action) {
      const keyCode = action.payload;
      const keyDownIndex = state.keysDown.indexOf(keyCode);
      if (keyDownIndex > -1) {
        state.keysDown.splice(keyDownIndex, 1);
      }
      const mapping = state.keyMap[keyCode];
      if (!mapping) {
        return;
      }

      const noteWithOctave = `${mapping.note}${state.octave + mapping.offset}`;

      switch (state.playmode.current.value) {
        case PLAYMODE_CONTINUOUS:
          state.synth.triggerRelease(noteWithOctave, Tone.now());
          break;

        // Do nothing with these playmodes on keyUp.
        case PLAYMODE_PLUCK:
        case PLAYMODE_TOGGLE:
        default:
          break;
      }
    },
    setOctave(state, action) {
      const parsed = parseInt(action.payload, 10);
      if (Number.isNaN(parsed)) {
        return;
      }
      if (parsed < state.octaveRange.min || parsed > state.octaveRange.max) {
        return;
      }
      state.octave = parsed;
      state.synth.releaseAll();
      state.toggledAttacks.splice(0, state.toggledAttacks.length);
    },
    setPlaymode(state, action) {
      const playmodeValue = action.payload;
      const newSetting = state.playmode.options.find((o) => o.value === playmodeValue);
      if (!newSetting) {
        return;
      }
      if (newSetting === state.playmode.current) {
        return;
      }
      state.playmode.current = newSetting;
      state.synth.releaseAll();
      state.toggledAttacks.splice(0, state.toggledAttacks.length);
    },
    setInstrument(state, action) {
      const instrumentValue = action.payload;
      const newSetting = state.instrument.options.find((o) => o.value === instrumentValue);
      if (!newSetting) {
        return;
      }
      if (newSetting === state.instrument.current) {
        return;
      }
      state.instrument.current = newSetting;
      state.synth.dispose();
      state.synth = createInstrument(newSetting.value);
      state.toggledAttacks.splice(0, state.toggledAttacks.length);
    },
  },
});

export const {
  focusLost,
  keyDown,
  keyUp,
  setOctave,
  setPlaymode,
  setInstrument,
} = keyboardSlice.actions;
export default keyboardSlice.reducer;
