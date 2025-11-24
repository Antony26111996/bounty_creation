import React from 'react';
import { useBounty } from '../context/BountyContext';
import Sidebar from '../components/Sidebar';
import StepIndicator from '../components/StepIndicator';
import Button from '../components/Button';
import Step1Brief from '../steps/Step1Brief';
import Step2Rewards from '../steps/Step2Rewards';
import Step3Backer from '../steps/Step3Backer';
import './BountyForm.css';

const BountyForm = ({ onComplete }) => {
  const { currentStep, nextStep, prevStep } = useBounty();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Brief />;
      case 2:
        return <Step2Rewards />;
      case 3:
        return <Step3Backer />;
      default:
        return <Step1Brief />;
    }
  };

  const handleNext = () => {
    if (currentStep === 3) {
      if (nextStep()) {
        onComplete();
      }
    } else {
      nextStep();
    }
  };

  return (
    <div className="bounty-form-container">
      <Sidebar />
      <div className="bounty-form-main">
        <div className="form-header">
          <h3 className="form-main-title">Create New Bounty</h3>
          {/* <p className="form-subtitle">Fill in the details to create an amazing bounty for your community</p> */}
        </div>
        <StepIndicator currentStep={currentStep} totalSteps={3} />
        <div className="bounty-form-content">
          {renderStep()}
          <div className="form-actions">
            {currentStep > 1 && (
              <Button variant="secondary" onClick={prevStep}>
                <span className="btn-icon">←</span> Back
              </Button>
            )}
            <Button onClick={handleNext}>
              {currentStep === 3 ? (
                <>Create Bounty <span className="btn-icon">✓</span></>
              ) : (
                <>Next <span className="btn-icon">→</span></>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BountyForm;

