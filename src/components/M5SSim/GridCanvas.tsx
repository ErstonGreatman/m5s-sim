import React, { useEffect, useRef } from 'react';
import { GridCanvasProps } from './types';
import { drawGrid, drawFrog, highlightCleave } from './utils/drawing';

const GridCanvas: React.FC<GridCanvasProps> = ({ dimensions, cleaveState }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw the grid and frog
    drawGrid(ctx, dimensions);
    drawFrog(ctx, dimensions);

    // Highlight cleave area if on a valid step
    const { sequence, currentStep } = cleaveState;
    if (currentStep >= 1 && currentStep <= sequence.length) {
      const direction = sequence[currentStep - 1] as 'L' | 'U' | 'R' | 'D';
      highlightCleave(ctx, dimensions, direction);
    }
  }, [dimensions, cleaveState]);

  return (
    <div className="flex-grow flex justify-center items-center p-4">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="border border-gray-300 bg-gray-50"
      />
    </div>
  );
};

export default GridCanvas;
