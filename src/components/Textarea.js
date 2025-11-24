import React from 'react';
import './Textarea.css';

const Textarea = ({ 
  label, 
  value, 
  onChange, 
  error, 
  required, 
  maxLength,
  placeholder,
  info,
  rows = 4
}) => {
  return (
    <div className="textarea-wrapper">
      {label && (
        <label className="textarea-label">
          {label} {required && <span className="required">*</span>}
          {info && <span className="info-icon" title={info}>ⓘ</span>}
        </label>
      )}
      <textarea
        className={`textarea-field ${error ? 'textarea-error' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
      />
      {maxLength && (
        <div className="character-count">
          character limit: {value.length}/{maxLength}
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Textarea;

