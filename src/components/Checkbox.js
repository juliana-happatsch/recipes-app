import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ options, value, setValue, id }) => {
  function handleChange({ target }) {
    if (target.checked) {
      setValue([...value, target.value]);
    } else {
      setValue(value.filter((cor) => cor !== target.value));
    }
  }

  return (
    <>
      {options.map((option) => (
        <label key={ option } htmlFor={ id }>
          <input
            id={ id }
            type="checkbox"
            value={ option }
            checked={ value.includes(option) }
            onChange={ handleChange }
          />
          {option}
        </label>
      ))}
    </>
  );
};

Checkbox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  setValue: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Checkbox;
