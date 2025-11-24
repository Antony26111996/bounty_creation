import React from 'react';
import { useBounty } from '../context/BountyContext';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Toggle from '../components/Toggle';
import FileUpload from '../components/FileUpload';
import './Steps.css';

const Step3Backer = () => {
  const { formData, updateFormData, errors } = useBounty();

  return (
    <div className="step-content">
      <Toggle
        label="Does the bounty have a sponsor or backer?"
        checked={formData.has_backer}
        onChange={(val) => updateFormData('has_backer', val)}
        info="Select this option if you wish to display the bounty sponsor/backer's logo and name on the bounty"
      />

      {formData.has_backer && (
        <div className="backer-details">
          <Input
            label="Enter sponsor or backer's name"
            value={formData.backer.name}
            onChange={(val) => updateFormData('backer.name', val)}
            error={errors['backer.name']}
            required
            maxLength={35}
            placeholder="Mention the name that will appear on bounties & impact certs"
          />

          <FileUpload
            label="Upload sponsor or backer's logo"
            value={formData.backer.logo}
            onChange={(val) => updateFormData('backer.logo', val)}
            error={errors['backer.logo']}
            required
          />

          <Textarea
            label="Enter Sponsor Message"
            value={formData.backer.message}
            onChange={(val) => updateFormData('backer.message', val)}
            maxLength={80}
            placeholder="Add sponsor message if any, optional"
          />
        </div>
      )}

      <div className="terms-section">
        <label className="terms-checkbox">
          <input
            type="checkbox"
            checked={formData.terms_accepted}
            onChange={(e) => updateFormData('terms_accepted', e.target.checked)}
          />
          <span>
            I accept the <a href="#terms" target="_blank" rel="noopener noreferrer">terms and conditions</a>
          </span>
        </label>
        {errors.terms_accepted && <div className="error-message">{errors.terms_accepted}</div>}
      </div>
    </div>
  );
};

export default Step3Backer;

