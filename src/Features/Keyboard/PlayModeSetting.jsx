import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaymode } from './KeyboardSlice';
import DropDown from '../Common/DropDown';

const PlayModeSetting = () => {
  const playmodeOptions = useSelector((state) => state.keyboard.playmode.options);
  const playmode = useSelector((state) => state.keyboard.playmode.current);
  const dispatch = useDispatch();

  return (
    <DropDown id="kb-mode-select" label="Mode (coming soon)" options={playmodeOptions} selected={playmode} onChange={(e) => dispatch(setPlaymode(e))} />
  );
};

export default PlayModeSetting;
