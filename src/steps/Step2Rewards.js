import React from 'react';
import { useBounty } from '../context/BountyContext';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import Toggle from '../components/Toggle';
import Textarea from '../components/Textarea';
import './Steps.css';

const Step2Rewards = () => {
  const { formData, updateFormData, errors } = useBounty();

  const currencies = [
    { value: 'USD', label: '₹ INR' },
    { value: 'EUR', label: '€ EUR' },
    { value: 'GBP', label: '£ GBP' },
    { value: 'INR', label: '$ USD' }
  ];

  const sdgOptions = [
    { value: 'no_poverty', label: 'No Poverty' },
    { value: 'zero_hunger', label: 'Zero Hunger' },
    { value: 'good_health', label: 'Good Health and Well-being' },
    { value: 'quality_education', label: 'Quality Education' },
    { value: 'gender_equality', label: 'Gender Equality' },
    { value: 'clean_water', label: 'Clean Water and Sanitation' },
    { value: 'affordable_energy', label: 'Affordable and Clean Energy' },
    { value: 'decent_work', label: 'Decent Work and Economic Growth' },
    { value: 'industry', label: 'Industry, Innovation and Infrastructure' },
    { value: 'reduced_inequalities', label: 'Reduced Inequalities' },
    { value: 'sustainable_cities', label: 'Sustainable Cities and Communities' },
    { value: 'responsible_consumption', label: 'Responsible Consumption and Production' },
    { value: 'climate_action', label: 'Climate Action' },
    { value: 'life_below_water', label: 'Life Below Water' },
    { value: 'life_on_land', label: 'Life on Land' },
    { value: 'peace_justice', label: 'Peace, Justice and Strong Institutions' },
    { value: 'partnerships', label: 'Partnerships for the Goals' }
  ];

  const calculateUSD = (amount, currency) => {
    const rates = { USD: 1, EUR: 1.1, GBP: 1.3, INR: 0.012 };
    return (amount * (rates[currency] || 1)).toFixed(2);
  };

  return (
    <div className="step-content">
      <h2 className="step-title">Bounty Reward</h2>
      <p className="step-subtitle">Choose bounty reward token and set the amount</p>

      <div className="reward-section">
        <div className="form-row">
          <Dropdown
            label="What is your budget for this bounty?"
            value={formData.reward.currency}
            onChange={(val) => updateFormData('reward.currency', val)}
            options={currencies}
            required
          />

          <Input
            label="Amount"
            type="number"
            value={formData.reward.amount}
            onChange={(val) => updateFormData('reward.amount', val)}
            error={errors['reward.amount']}
            required
            placeholder="12,000"
          />
        </div>
        {formData.reward.amount && (
          <div className="usd-conversion">
            In USD: {calculateUSD(formData.reward.amount, formData.reward.currency)}
          </div>
        )}
      </div>

      <Input
        label="How many winners?"
        type="number"
        value={formData.reward.winners}
        onChange={(val) => updateFormData('reward.winners', val)}
        error={errors['reward.winners']}
        required
        placeholder="1"
      />

      {formData.reward.winners && formData.reward.amount && (
        <div className="winner-calculation">
          Each winner will be awarded: {(formData.reward.amount / formData.reward.winners).toFixed(2)} {formData.reward.currency}
        </div>
      )}

      <div className="timeline-section">
        <h3 className="section-title">Timeline</h3>
        
        <Input
          label="Expiration Date"
          type="date"
          value={formData.timeline.expiration_date}
          onChange={(val) => updateFormData('timeline.expiration_date', val)}
          error={errors['timeline.expiration_date']}
          required
          info="When submissions close"
        />

        <div className="estimated-completion">
          <label className="input-label">Estimated Completion Time</label>
          <div className="time-inputs">
            <Input
              label="Days"
              type="number"
              value={formData.timeline.estimated_completion.days}
              onChange={(val) => updateFormData('timeline.estimated_completion.days', val)}
              placeholder="0"
            />
            <Input
              label="Hours"
              type="number"
              value={formData.timeline.estimated_completion.hours}
              onChange={(val) => updateFormData('timeline.estimated_completion.hours', val)}
              placeholder="0"
            />
            <Input
              label="Minutes"
              type="number"
              value={formData.timeline.estimated_completion.minutes}
              onChange={(val) => updateFormData('timeline.estimated_completion.minutes', val)}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="impact-section">
        <Toggle
          label="Impact Certificate"
          checked={formData.hasImpactCertificate}
          onChange={(val) => updateFormData('hasImpactCertificate', val)}
          info="Do you wish to issue impact certificates for this bounty?"
        />

        {formData.hasImpactCertificate && (
          <Textarea
            label="Impact Certificate Brief"
            value={formData.impactBriefMessage}
            onChange={(val) => updateFormData('impactBriefMessage', val)}
            error={errors.impactBriefMessage}
            required
            maxLength={100}
            placeholder="Creating digital assets for fellow guild members"
          />
        )}
      </div>

      <Dropdown
        label="SDGs"
        value={formData.sdgs}
        onChange={(val) => updateFormData('sdgs', val)}
        options={sdgOptions}
        multiple={true}
        placeholder="Choose upto 4 secondary SDGs (optional)"
        info="Select relevant Sustainable Development Goals"
      />
    </div>
  );
};

export default Step2Rewards;

