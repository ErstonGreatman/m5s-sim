import React, { useState } from 'react';
import TitleBar from './TitleBar';
import InputArea from './InputArea';
import GridCanvas from './GridCanvas';
import { validateInput } from './utils/validation';
import { CanvasDimensions, CleaveState } from './types';

const M5SSim: React.FC = () => {
  // Canvas dimensions
  const dimensions: CanvasDimensions = {
    width: 800,
    height: 900,
    rows: 9, // 8 data rows + 1 header row
    cols: 8
  };

  // State
  const [inputValue, setInputValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [cleaveState, setCleaveState] = useState<CleaveState>({
    sequence: '',
    currentStep: 0
  });

  // Handlers
  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (value.length > 0) {
      const error = validateInput(value);
      setErrorMessage(error || '');
    } else {
      setErrorMessage('');
    }
  };

  const handlePreviousCleave = () => {
    if (inputValue.length === 0) {
      setErrorMessage('Input cannot be empty');
      return;
    }

    const error = validateInput(inputValue);
    if (error) {
      setErrorMessage(error);
      return;
    }

    if (cleaveState.currentStep === 8) {
      setCleaveState({
        sequence: inputValue,
        currentStep: 7
      });
    } else if (cleaveState.currentStep < inputValue.length) {
      setCleaveState(prev => ({
        ...prev,
        currentStep: prev.currentStep - 1
      }));
    }
  };

  const handleNextCleave = () => {
    if (inputValue.length === 0) {
      setErrorMessage('Input cannot be empty');
      return;
    }

    const error = validateInput(inputValue);
    if (error) {
      setErrorMessage(error);
      return;
    }

    if (cleaveState.currentStep === 0) {
      setCleaveState({
        sequence: inputValue,
        currentStep: 1
      });
    } else if (cleaveState.currentStep < inputValue.length) {
      setCleaveState(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1
      }));
    }
  };

  const handleReset = () => {
    setInputValue('');
    setErrorMessage('');
    setCleaveState({
      sequence: '',
      currentStep: 0
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <TitleBar title="M5S Sim | Cruiserweight AAC M1S" />

      <InputArea
        value={inputValue}
        error={errorMessage}
        currentStep={cleaveState.currentStep}
        onChange={handleInputChange}
        onReset={handleReset}
        onPreviousCleave={handlePreviousCleave}
        onNextCleave={handleNextCleave}
      />

      <GridCanvas
        dimensions={dimensions}
        cleaveState={cleaveState}
      />
    </div>
  );
};

export default M5SSim;
