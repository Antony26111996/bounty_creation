import React from 'react';
import './Dropdown.css';

const Dropdown = ({ 
  label, 
  value, 
  onChange, 
  options, 
  error, 
  required,
  placeholder = 'Select an option',
  info,
  multiple = false
}) => {
  const handleMultipleChange = (optionValue) => {
    if (multiple) {
      const newValue = value.includes(optionValue)
        ? value.filter(v => v !== optionValue)
        : [...value, optionValue];
      onChange(newValue);
    }
  };

  return (
    <div className="dropdown-wrapper">
      {label && (
        <label className="dropdown-label">
          {label} {required && <span className="required">*</span>}
          {info && <span className="info-icon" title={info}>ⓘ</span>}
        </label>
      )}
      {multiple ? (
        <div className={`dropdown-multiple ${error ? 'dropdown-error' : ''}`}>
          <div className="dropdown-placeholder">
            {value.length > 0 ? `${value.length} selected` : placeholder}
          </div>
          <div className="dropdown-options">
            {options.map(option => (
              <label key={option.value} className="dropdown-checkbox">
                <input
                  type="checkbox"
                  checked={value.includes(option.value)}
                  onChange={() => handleMultipleChange(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      ) : (
        <select
          className={`dropdown-field ${error ? 'dropdown-error' : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">{placeholder}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Dropdown;

