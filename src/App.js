import React, { useState } from 'react';
import { BountyProvider } from './context/BountyContext';
import BountyForm from './pages/BountyForm';
import ConfirmationPage from './pages/ConfirmationPage';
import ResultPage from './pages/ResultPage';
import './App.css';

function App() {
  const [stage, setStage] = useState('form'); // form, confirmation, result

  const handleFormComplete = () => {
    setStage('confirmation');
  };

  const handleConfirmationComplete = () => {
    setStage('result');
  };

  const handleReset = () => {
    setStage('form');
    window.location.reload();
  };

  return (
    <BountyProvider>
      <div className="App">
        {stage === 'form' && <BountyForm onComplete={handleFormComplete} />}
        {stage === 'confirmation' && <ConfirmationPage onComplete={handleConfirmationComplete} />}
        {stage === 'result' && <ResultPage onReset={handleReset} />}
      </div>
    </BountyProvider>
  );
}

export default App;
