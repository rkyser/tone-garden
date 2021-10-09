import './KeyboardKey.css';
import React from 'react';
import PropTypes from 'prop-types';

const KeyboardKey = ({
  x,
  y,
  width,
  height,
  keyName,
  actionName,
  isDown,
  disabled,
}) => {
  const actionNameElement = actionName !== ''
    ? (<text x={x + (width / 2)} y={y + (height / 2)} dominantBaseline="middle" textAnchor="middle" className="keyboard-key-action-name">{actionName}</text>)
    : '';

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={5}
        className={`keyboard-key ${isDown ? 'keyboard-key-active' : ''} ${disabled ? 'keyboard-key-disabled' : ''}`}
      />
      <text x={x + 5} y={y + 10} dominantBaseline="middle" textAnchor="left" className="keyboard-key-label">{keyName}</text>
      {actionNameElement}
    </g>
  );
};

KeyboardKey.defaultProps = {
  actionName: '',
  disabled: false,
};

KeyboardKey.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  keyName: PropTypes.string.isRequired,
  actionName: PropTypes.string,
  isDown: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
};

export default KeyboardKey;
