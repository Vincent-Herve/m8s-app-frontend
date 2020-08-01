import React from 'react';
import PropTypes from 'prop-types';
import FieldStyled from './FieldStyled';

// == Composant
const Field = ({
  value,
  min,
  type,
  name,
  placeholder,
  onChange,
}) => {
  const handleChange = (evt) => {
    onChange(evt.target.value, name);
  };

  const inputId = `field-${name}`;

  return (
    <FieldStyled>
      <div>
        <label
          htmlFor={inputId}
          className="field-label"
        >
          {placeholder} :
        </label>
        <input
          value={value}
          onChange={handleChange}
          id={inputId}
          type={type}
          placeholder={placeholder}
          name={name}
          min={min}
        />
      </div>
    </FieldStyled>
  );
};

Field.propTypes = {
  value: PropTypes.string,
  min: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

// Valeurs par défaut pour les props
Field.defaultProps = {
  value: '',
  min: '',
  type: 'text',
};

// == Export
export default Field;
