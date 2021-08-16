import PropTypes from 'prop-types';
import React from 'react';

const Input = ({ id, label, setValue, ...props }) => (
  <>
    <label htmlFor={ id }>{label}</label>
    <input
      id={ id }
      name={ id }
      onChange={ ({ target }) => setValue(target.value) }
      { ...props }
    />
  </>
);

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default Input;
