import React from 'react';
import './InputField.css'; 


const InputField = ({ as = 'input', type = 'text', placeholder, required, rows = 8, ...rest }) => {
  const commonClasses = 'input-field';

  if (as === 'textarea') {
    return (
      <textarea
        className={commonClasses}
        placeholder={placeholder}
        required={required}
        rows={rows}
        {...rest}
      />
    );
  }
  return (
    <input
      className={commonClasses}
      type={type}
      placeholder={placeholder}
      required={required}
      {...rest}
    />
  );
};

export default InputField;