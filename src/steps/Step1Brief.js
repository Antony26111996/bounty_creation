import React from 'react';
import { useBounty } from '../context/BountyContext';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Dropdown from '../components/Dropdown';
import RadioGroup from '../components/RadioGroup';
import MapSelector from '../components/MapSelector';
import './Steps.css';

const Step1Brief = () => {
  const { formData, updateFormData, errors } = useBounty();

  const bountyTypes = [
    { value: 'content', label: 'Content' },
    { value: 'design', label: 'Design' },
    { value: 'development', label: 'Development' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'other', label: 'Other' }
  ];

  const impactCores = [
    { value: 'water', label: 'Water' },
    { value: 'earth', label: 'Earth' },
    { value: 'social', label: 'Social' },
    { value: 'energy', label: 'Energy' }
  ];

  const bountyModes = [
    { value: 'digital', label: 'Digital Bounty' },
    { value: 'physical', label: 'Physical Bounty' }
  ];

  return (
    <div className="step-content">
      <h2 className="step-title">Bounty Title</h2>
      
      <Textarea
        label="Bounty Description"
        value={formData.description}
        onChange={(val) => updateFormData('description', val)}
        error={errors.description}
        required
        maxLength={1000}
        placeholder="Briefly describe what the bounty does"
        info="Provide a clear description of the bounty objectives"
      />

      <Input
        label="Bounty Title"
        value={formData.title}
        onChange={(val) => updateFormData('title', val)}
        error={errors.title}
        required
        maxLength={40}
        placeholder="Type your bounty's title"
      />

      <Dropdown
        label="Project"
        value={formData.projectTitle}
        onChange={(val) => updateFormData('projectTitle', val)}
        options={[
          { value: 'project1', label: 'Project Alpha' },
          { value: 'project2', label: 'Project Beta' },
          { value: 'project3', label: 'Project Gamma' }
        ]}
        error={errors.projectTitle}
        required
        placeholder="Choose a project to link the bounty"
        info="Select the project this bounty belongs to"
      />

      <div className="form-row">
        <Dropdown
          label="Bounty Type"
          value={formData.type}
          onChange={(val) => updateFormData('type', val)}
          options={bountyTypes}
          error={errors.type}
          required
          placeholder="Choose category"
          info="Select the category that best fits this bounty"
        />

        <Dropdown
          label="Dominant Impact Core"
          value={formData.dominant_core}
          onChange={(val) => updateFormData('dominant_core', val)}
          options={impactCores}
          error={errors.dominant_core}
          required
          placeholder="Choose core"
          info="Select the primary impact area"
        />
      </div>

      <RadioGroup
        label="Bounty Mode"
        options={bountyModes}
        value={formData.mode}
        onChange={(val) => updateFormData('mode', val)}
        info="Choose between digital or physical bounty"
      />

      {formData.mode === 'physical' && (
        <div className="location-section">
          <Input
            label="Enter Location"
            value={formData.location}
            onChange={(val) => updateFormData('location', val)}
            error={errors.location}
            required
            placeholder="City/Town where the bounty is live?"
            info="Specify the physical location"
          />
          <MapSelector
            location={formData.location}
            selectedCoords={formData.coordinates}
            onLocationSelect={(coords) => updateFormData('coordinates', coords)}
          />
        </div>
      )}
    </div>
  );
};

export default Step1Brief;

