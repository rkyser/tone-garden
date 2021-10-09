import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaymode } from './KeyboardSlice';
import DropDown from '../Common/DropDown';
import DropDownOption from '../Common/DropDownOption';

const PlayModeSetting = () => {
  const playmodeOptions = useSelector((state) => state.keyboard.playmode.options)
    .map((o) => (<DropDownOption key={o.value} value={o.value} description={o.display} />));
  const playmode = useSelector((state) => state.keyboard.playmode.current);
  const dispatch = useDispatch();

  return (
    <DropDown id="kb-mode-select" label="Mode" selected={playmode.value} onChange={(e) => dispatch(setPlaymode(e))}>
      {playmodeOptions}
    </DropDown>
  );
};

export default PlayModeSetting;
