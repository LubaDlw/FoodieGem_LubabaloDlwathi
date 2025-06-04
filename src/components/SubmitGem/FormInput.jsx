
import React from 'react';

const FormInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  type = 'text', 
  required = false,
  icon: Icon,
  rows
}) => (
  <div className="form-group">
    {label && <label>{label} {required && '*'}</label>}
    <div className={Icon ? 'input-with-icon' : ''}>
      {Icon && <Icon size={20} />}
      {rows ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  </div>
);

export default FormInput;