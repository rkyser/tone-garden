import './KeyboardKey.css';
import React from 'react';
import PropTypes from 'prop-types';

const KeyboardKey = ({ keyName, note }) => (
  <div className="keyboardKey">
    {keyName}
    -
    {note}
  </div>
);

KeyboardKey.propTypes = {
  keyName: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
};

export default KeyboardKey;
