import React from 'react';
import { InputAreaProps } from './types';
import { sanitizeInput } from './utils/validation';
import ButtonArea from './ButtonArea.tsx';

const InputArea: React.FC<InputAreaProps> = ({ value, error, currentStep, onChange, onReset, onPreviousCleave, onNextCleave }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeInput(e.target.value);
    onChange(sanitized);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <div className="w-2/3 text-center">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Enter cleave directions (LURD)"
          maxLength={8}
          className="w-full max-w-lg p-2 border border-gray-300 rounded"
        />
        {error && (
          <div className="text-red-500 text-sm mt-1">{error}</div>
        )}
      </div>
      <ButtonArea
        currentStep={currentStep}
        maxSteps={value.length}
        onReset={onReset}
        onPreviousCleave={onPreviousCleave}
        onNextCleave={onNextCleave}
      />
    </div>
  );
};

export default InputArea;
