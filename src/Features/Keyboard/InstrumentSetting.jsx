import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInstrument } from './KeyboardSlice';
import DropDown from '../Common/DropDown';
import DropDownOption from '../Common/DropDownOption';

const InstrumentSetting = () => {
  const instrumentOptions = useSelector((state) => state.keyboard.instrument.options)
    .map((o) => <DropDownOption key={o.value} value={o.value} description={o.display} />);
  const currentInstrument = useSelector((state) => state.keyboard.instrument.current);
  const dispatch = useDispatch();

  return (
    <DropDown id="kb-instrument-select" label="Instrument" selected={currentInstrument.value} onChange={(e) => dispatch(setInstrument(e))}>
      {instrumentOptions}
    </DropDown>
  );
};

export default InstrumentSetting;
