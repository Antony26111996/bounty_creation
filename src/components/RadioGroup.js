import React from 'react';
import './RadioGroup.css';

const RadioGroup = ({ label, options, value, onChange, error, required, info }) => {
  return (
    <div className="radio-group-wrapper">
      {label && (
        <label className="radio-group-label">
          {label} {required && <span className="required">*</span>}
          {info && <span className="info-icon" title={info}>ⓘ</span>}
        </label>
      )}
      <div className="radio-options">
        {options.map(option => (
          <label key={option.value} className="radio-option">
            <input
              type="radio"
              name={label}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span className="radio-custom" />
            <span className="radio-label-text">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default RadioGroup;

