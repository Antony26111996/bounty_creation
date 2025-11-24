import React, { useState, useEffect } from 'react';
import './ConfirmationPage.css';

const ConfirmationPage = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        onComplete();
      }, 1500);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="confirmation-page">
      <div className="confirmation-content">
        {loading ? (
          <>
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
            <h2>Creating your bounty...</h2>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <p>Please wait while we process your bounty</p>
          </>
        ) : (
          <>
            <div className="success-icon">✓</div>
            <h2>Bounty Created Successfully!</h2>
            <p>Redirecting to results...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmationPage;

