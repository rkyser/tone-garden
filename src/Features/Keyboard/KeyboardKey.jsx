import './KeyboardKey.css';
import React from 'react';
import PropTypes from 'prop-types';

const KeyboardKey = ({
  x,
  y,
  width,
  height,
  keyName,
  note,
  isDown,
}) => {
  const noteTextElement = note !== ''
    ? (<text x={x + (width / 2)} y={y + (height / 2)} dominantBaseline="middle" textAnchor="middle">{note}</text>)
    : '';

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={5}
        className={`keyboard-key ${isDown ? 'active' : ''}`}
      />
      <text x={x + 10} y={y + 15} dominantBaseline="middle" textAnchor="left" className="keyboard-key-label">{keyName}</text>
      {noteTextElement}
    </g>
  );
};

KeyboardKey.defaultProps = {
  note: '',
};

KeyboardKey.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  keyName: PropTypes.string.isRequired,
  note: PropTypes.string,
  isDown: PropTypes.bool.isRequired,
};

export default KeyboardKey;
