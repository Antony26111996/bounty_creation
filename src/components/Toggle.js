import React from 'react';
import './Toggle.css';

const Toggle = ({ label, checked, onChange, info }) => {
  return (
    <div className="toggle-wrapper">
      <label className="toggle-label">
        {label}
        {info && <span className="info-icon" title={info}>ⓘ</span>}
      </label>
      <div 
        className={`toggle-switch ${checked ? 'toggle-checked' : ''}`}
        onClick={() => onChange(!checked)}
      >
        <div className="toggle-thumb" />
      </div>
    </div>
  );
};

export default Toggle;

