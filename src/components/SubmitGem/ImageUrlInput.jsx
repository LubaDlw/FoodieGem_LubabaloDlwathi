import React from 'react';

const ImageUrlInput = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  helperText 
}) => (
  <div className="form-group">
    <label>{label} {required && '*'}</label>
    <input
      type="url"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
    {helperText && <small>{helperText}</small>}
  </div>
);

export default ImageUrlInput;