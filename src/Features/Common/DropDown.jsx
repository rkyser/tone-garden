import React from 'react';
import PropTypes from 'prop-types';
import './DropDown.css';

const DropDown = ({
  id,
  children,
  label,
  selected,
  onChange,
}) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <select id={id} value={selected} onChange={(e) => onChange(e.target.value)}>
      {children}
    </select>
  </div>
);

DropDown.defaultProps = {
  label: '',
  selected: '',
  onChange: () => {},
};

DropDown.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  selected: PropTypes.string,
  onChange: PropTypes.func,
};

export default DropDown;
