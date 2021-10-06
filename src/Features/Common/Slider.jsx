import React from 'react';
import PropTypes from 'prop-types';

const Slider = ({
  id,
  label,
  min,
  max,
  step,
  value,
  onChange,
}) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

Slider.defaultProps = {
  label: '',
  min: 0,
  max: 100,
  step: 1,
  value: 0,
  onChange: () => {},
};

Slider.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export default Slider;
