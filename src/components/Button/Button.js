import React from 'react';
import './Button.css';

const Button = ({ onClick, disabled, children, className }) => (
  <button className={`button ${className}`} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

export default Button;
