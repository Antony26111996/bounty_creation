import React from 'react';
import './Input.css';

const Input = ({ 
  label, 
  value, 
  onChange, 
  error, 
  required, 
  maxLength,
  placeholder,
  type = 'text',
  info
}) => {
  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label">
          {label} {required && <span className="required">*</span>}
          {info && <span className="info-icon" title={info}>ⓘ</span>}
        </label>
      )}
      <input
        type={type}
        className={`input-field ${error ? 'input-error' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      {maxLength && type === 'text' && (
        <div className="character-count">
          character limit: {value.length}/{maxLength}
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Input;

