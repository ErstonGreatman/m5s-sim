import React from 'react';
import { ButtonAreaProps } from './types';

const ButtonArea: React.FC<ButtonAreaProps> = ({ currentStep, maxSteps, onReset, onNextCleave, onPreviousCleave }) => {
  return (
    <div className="flex items-center justify-center gap-4 p-4">
      <button
        onClick={onPreviousCleave}
        className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={currentStep === 0}
      >
        &lt; Previous
      </button>
      <div className="text-xl font-bold text-gray-600">
        Step: {currentStep}
      </div>
      <button
        onClick={onNextCleave}
        className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ${currentStep === maxSteps ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={currentStep === maxSteps}
      >
        Next &gt;
      </button>
      <button
        onClick={onReset}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Reset
      </button>
    </div>
  );
};

export default ButtonArea;
