import React, { createContext, useContext, useState } from 'react';

const BountyContext = createContext();

export const useBounty = () => {
  const context = useContext(BountyContext);
  if (!context) {
    throw new Error('useBounty must be used within BountyProvider');
  }
  return context;
};

export const BountyProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectTitle: '',
    type: '',
    dominant_core: '',
    mode: 'digital',
    location: '',
    coordinates: { lat: null, lng: null },
    reward: {
      currency: 'USD',
      amount: '',
      winners: ''
    },
    timeline: {
      expiration_date: '',
      estimated_completion: {
        days: '',
        hours: '',
        minutes: ''
      }
    },
    hasImpactCertificate: false,
    impactBriefMessage: '',
    sdgs: [],
    has_backer: false,
    backer: {
      name: '',
      logo: '',
      message: ''
    },
    terms_accepted: false
  });

  const [errors, setErrors] = useState({});

  const updateFormData = (field, value) => {
    setFormData(prev => {
      if (field.includes('.')) {
        const keys = field.split('.');
        const newData = { ...prev };
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) {
          current[keys[i]] = { ...current[keys[i]] };
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        return newData;
      }
      return { ...prev, [field]: value };
    });
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.title.trim()) {
        newErrors.title = 'Title is required';
      } else if (formData.title.length > 40) {
        newErrors.title = 'Title must be 40 characters or less';
      }
      
      if (!formData.description.trim()) {
        newErrors.description = 'Description is required';
      }
      
      if (!formData.projectTitle.trim()) {
        newErrors.projectTitle = 'Project is required';
      }
      
      if (!formData.type) {
        newErrors.type = 'Bounty type is required';
      }
      
      if (!formData.dominant_core) {
        newErrors.dominant_core = 'Impact core is required';
      }
      
      if (formData.mode === 'physical' && !formData.location.trim()) {
        newErrors.location = 'Location is required for physical bounties';
      }
    }

    if (step === 2) {
      if (!formData.reward.amount || formData.reward.amount <= 0) {
        newErrors['reward.amount'] = 'Amount must be greater than 0';
      }
      
      if (!formData.reward.winners || formData.reward.winners <= 0) {
        newErrors['reward.winners'] = 'Number of winners must be at least 1';
      }
      
      if (!formData.timeline.expiration_date) {
        newErrors['timeline.expiration_date'] = 'Expiration date is required';
      }
      
      if (formData.hasImpactCertificate && !formData.impactBriefMessage.trim()) {
        newErrors.impactBriefMessage = 'Impact brief is required';
      }
    }

    if (step === 3) {
      if (formData.has_backer) {
        if (!formData.backer.name.trim()) {
          newErrors['backer.name'] = 'Backer name is required';
        }
        if (!formData.backer.logo) {
          newErrors['backer.logo'] = 'Backer logo is required';
        }
      }
      
      if (!formData.terms_accepted) {
        newErrors.terms_accepted = 'You must accept the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
      return true;
    }
    return false;
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step) => {
    if (step < currentStep) {
      setCurrentStep(step);
    } else if (step > currentStep) {
      for (let i = currentStep; i < step; i++) {
        if (!validateStep(i)) {
          return false;
        }
      }
      setCurrentStep(step);
    }
    return true;
  };

  return (
    <BountyContext.Provider
      value={{
        currentStep,
        formData,
        errors,
        updateFormData,
        validateStep,
        nextStep,
        prevStep,
        goToStep,
        setCurrentStep
      }}
    >
      {children}
    </BountyContext.Provider>
  );
};

