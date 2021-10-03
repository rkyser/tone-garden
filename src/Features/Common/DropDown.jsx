import React from 'react';
import PropTypes from 'prop-types';
import './DropDown.css';

const DropDown = ({
  id, options, label, selected, onChange,
}) => {
  const dropDownItems = options.map((o) => (
    <option key={o} value={o}>{o}</option>
  ));
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={selected} onChange={(e) => onChange(e.target.value)}>
        {dropDownItems}
      </select>
    </div>
  );
};

DropDown.defaultProps = {
  label: '',
  selected: '',
  onChange: () => {},
};

DropDown.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func,
};

export default DropDown;
