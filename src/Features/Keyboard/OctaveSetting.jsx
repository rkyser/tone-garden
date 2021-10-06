import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOctave } from './KeyboardSlice';
import Slider from '../Common/Slider';

const OctaveSetting = () => {
  const octave = useSelector((state) => state.keyboard.octave);
  const min = useSelector((state) => state.keyboard.octaveRange.min);
  const max = useSelector((state) => state.keyboard.octaveRange.max);
  const dispatch = useDispatch();

  return (
    <Slider
      id="octave-select"
      label={`Octave ${octave}`}
      min={min}
      max={max}
      value={octave}
      onChange={(e) => dispatch(setOctave(e))}
    />
  );
};

export default OctaveSetting;
