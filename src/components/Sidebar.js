import React from 'react';
import { useBounty } from '../context/BountyContext';
import './Sidebar.css';

const Sidebar = () => {
  const { currentStep, goToStep } = useBounty();

  const steps = [
    { number: 1, label: 'Basics', name: 'Brief' },
    { number: 2, label: 'Rewards', name: 'Rewards' },
    { number: 3, label: 'Backer', name: 'Backer' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>BOUNTY STEPS</h3>
      </div>
      <div className="sidebar-steps">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`sidebar-step ${currentStep === step.number ? 'active' : ''} ${
              currentStep > step.number ? 'completed' : ''
            }`}
            onClick={() => goToStep(step.number)}
          >
            <div className="step-number">{step.number}</div>
            <div className="step-label">{step.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

