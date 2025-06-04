import React from 'react';

const FormSection = ({ title, children, className = '' }) => (
  <div className={`form-section ${className}`}>
    <h3>{title}</h3>
    {children}
  </div>
);

export default FormSection;