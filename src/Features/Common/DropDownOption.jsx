import React from 'react';
import PropTypes from 'prop-types';
import './DropDown.css';

const DropDownOption = ({
  description,
  value,
  disabled,
}) => (
  <option value={value} disabled={disabled}>{description === null ? value : description}</option>
);

DropDownOption.defaultProps = {
  description: null,
  disabled: false,
};

DropDownOption.propTypes = {
  description: PropTypes.string,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default DropDownOption;
