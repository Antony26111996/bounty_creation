import React from 'react';
import './StepIndicator.css';

const StepIndicator = ({ currentStep, totalSteps = 3 }) => {
  const stepLabels = ['Brief', 'Rewards', 'Backer'];
  
  return (
    <div className="step-indicator">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className="step-indicator-item">
          <div className="step-indicator-content">
            <div className={`step-circle ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}>
              {currentStep > step ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : step}
            </div>
            <div className="step-label-text">{stepLabels[step - 1]}</div>
          </div>
          {step < totalSteps && <div className="step-line" />}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;

