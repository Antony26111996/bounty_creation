import React from 'react';
import { useBounty } from '../context/BountyContext';
import Button from '../components/Button';
import './ResultPage.css';

const ResultPage = ({ onReset }) => {
  const { formData } = useBounty();

  const formatPayload = () => {
    const payload = {
      title: formData.title,
      description: formData.description,
      projectTitle: formData.projectTitle,
      type: formData.type,
      dominant_core: formData.dominant_core,
      mode: formData.mode,
      reward: {
        currency: formData.reward.currency,
        amount: Number(formData.reward.amount),
        winners: Number(formData.reward.winners)
      },
      timeline: {
        expiration_date: formData.timeline.expiration_date,
        estimated_completion: {
          days: Number(formData.timeline.estimated_completion.days) || 0,
          hours: Number(formData.timeline.estimated_completion.hours) || 0,
          minutes: Number(formData.timeline.estimated_completion.minutes) || 0
        }
      },
      hasImpactCertificate: formData.hasImpactCertificate,
      sdgs: formData.sdgs,
      has_backer: formData.has_backer,
      terms_accepted: formData.terms_accepted
    };

    if (formData.mode === 'physical') {
      payload.location = formData.location;
      if (formData.coordinates && formData.coordinates.lat && formData.coordinates.lng) {
        payload.coordinates = formData.coordinates;
      }
    }

    if (formData.hasImpactCertificate) {
      payload.impactBriefMessage = formData.impactBriefMessage;
    }

    if (formData.has_backer) {
      payload.backer = {
        name: formData.backer.name,
        logo: formData.backer.logo,
        message: formData.backer.message
      };
    }

    return payload;
  };

  const payload = formatPayload();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    alert('Payload copied to clipboard!');
  };

  return (
    <div className="result-page">
      <div className="result-container">
        <div className="result-header">
          <h1>Bounty Created Successfully!</h1>
          <p>Here's your bounty payload</p>
        </div>

        <div className="result-content">
          <div className="payload-summary">
            <div className="summary-card">
              <div className="summary-icon">📋</div>
              <div className="summary-info">
                <div className="summary-label">Bounty Title</div>
                <div className="summary-value">{payload.title}</div>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">💰</div>
              <div className="summary-info">
                <div className="summary-label">Total Reward</div>
                <div className="summary-value">
                  {payload.reward.amount} {payload.reward.currency}
                </div>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">🏆</div>
              <div className="summary-info">
                <div className="summary-label">Winners</div>
                <div className="summary-value">{payload.reward.winners}</div>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">📅</div>
              <div className="summary-info">
                <div className="summary-label">Expiration Date</div>
                <div className="summary-value">
                  {new Date(payload.timeline.expiration_date).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          <div className="payload-json">
            <div className="json-header">
              <span>Full JSON Payload</span>
              <button className="copy-btn" onClick={copyToClipboard}>
                Copy
              </button>
            </div>
            <pre>{JSON.stringify(payload, null, 2)}</pre>
          </div>
        </div>

        <div className="result-actions">
          <Button onClick={onReset} fullWidth>
            Create Another Bounty
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;

