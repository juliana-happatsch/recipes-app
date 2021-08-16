import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ options, value, setValue, ...props }) => (
  <select
    value={ value }
    onChange={ ({ target }) => setValue(target.value) }
    { ...props }
  >
    <option value="" disabled>
      Selecione
    </option>
    {options.map((option) => (
      <option key={ option } value={ option }>
        {option}
      </option>
    ))}
  </select>
);

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Select;
