import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOctave } from './KeyboardSlice';
import DropDown from '../Common/DropDown';

const OctaveDropDown = () => {
  const octaveOptions = useSelector((state) => state.keyboard.octaveOptions)
    .map((o) => o.toString());
  const octave = useSelector((state) => state.keyboard.octave).toString();
  const dispatch = useDispatch();

  return (
    <DropDown id="octave-select" label="Octave" options={octaveOptions} selected={octave} onChange={(e) => dispatch(setOctave(e))} />
  );
};

export default OctaveDropDown;
