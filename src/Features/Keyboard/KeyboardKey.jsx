import './KeyboardKey.css';
import React from 'react';
import PropTypes from 'prop-types';

const KeyboardKey = ({ keyName, note, isDown }) => (
  <div className={`keyboard-key ${isDown ? 'active' : ''}`}>
    {keyName}
    -
    {note}
  </div>
);

KeyboardKey.propTypes = {
  keyName: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  isDown: PropTypes.bool.isRequired,
};

export default KeyboardKey;
