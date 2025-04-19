import { CanvasDimensions, DrawingContext } from '../types';

/**
 * Draws the grid with header row
 */
export const drawGrid = (
  ctx: DrawingContext,
  dimensions: CanvasDimensions
): void => {
  const { width, height, rows, cols } = dimensions;
  const cellWidth = width / cols;
  const cellHeight = height / rows;

  ctx.clearRect(0, 0, width, height);

  // Draw grid lines
  ctx.strokeStyle = '#ccc';
  ctx.lineWidth = 1;

  // Horizontal lines
  for (let i = 0; i <= rows; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * cellHeight);
    ctx.lineTo(width, i * cellHeight);
    ctx.stroke();
  }

  // Vertical lines
  for (let j = 0; j <= cols; j++) {
    ctx.beginPath();
    ctx.moveTo(j * cellWidth, 0);
    ctx.lineTo(j * cellWidth, height);
    ctx.stroke();
  }

  // Highlight header row
  ctx.fillStyle = 'rgba(74, 144, 226, 0.2)';
  ctx.fillRect(0, 0, width, cellHeight);

  // Add header labels
  ctx.fillStyle = '#333';
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let j = 0; j < cols; j++) {
    ctx.fillText(`Column ${j + 1}`, (j + 0.5) * cellWidth, cellHeight / 2);
  }
};

/**
 * Draws the frog in the center of the grid
 */
export const drawFrog = (
  ctx: DrawingContext,
  dimensions: CanvasDimensions
): void => {
  const { width, height, rows } = dimensions;
  const cellHeight = height / rows;

  const centerX = width / 2;
  const centerY = cellHeight + (height - cellHeight) / 2;

  const cellWidth = width / dimensions.cols;
  const frogSize = Math.min(cellWidth, cellHeight) * 0.8;

  // Frog body
  ctx.fillStyle = '#2ecc71';
  ctx.beginPath();
  ctx.arc(centerX, centerY, frogSize / 2, 0, Math.PI * 2);
  ctx.fill();

  // Left eye
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(centerX - frogSize / 5, centerY - frogSize / 5, frogSize / 8, 0, Math.PI * 2);
  ctx.fill();

  // Right eye
  ctx.beginPath();
  ctx.arc(centerX + frogSize / 5, centerY - frogSize / 5, frogSize / 8, 0, Math.PI * 2);
  ctx.fill();

  // Left pupil
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(centerX - frogSize / 5, centerY - frogSize / 5, frogSize / 16, 0, Math.PI * 2);
  ctx.fill();

  // Right pupil
  ctx.beginPath();
  ctx.arc(centerX + frogSize / 5, centerY - frogSize / 5, frogSize / 16, 0, Math.PI * 2);
  ctx.fill();

  // Mouth
  ctx.beginPath();
  ctx.arc(centerX, centerY + frogSize / 5, frogSize / 6, 0, Math.PI);
  ctx.stroke();
};

/**
 * Creates a rainbow gradient for the cleave highlighting
 */
export const createRainbowGradient = (
  ctx: DrawingContext,
  dimensions: CanvasDimensions,
  direction: 'L' | 'U' | 'R' | 'D'
): CanvasGradient | null => {
  const { width, height, rows } = dimensions;
  const cellHeight = height / rows;

  let gradient: CanvasGradient;

  switch(direction) {
    case 'L': // Left half
      gradient = ctx.createLinearGradient(0, 0, width/2, height);
      break;
    case 'R': // Right half
      gradient = ctx.createLinearGradient(width/2, 0, width, height);
      break;
    case 'U': // Upper half (excluding header row)
      gradient = ctx.createLinearGradient(0, cellHeight, width, (height - cellHeight)/2 + cellHeight);
      break;
    case 'D': // Lower half
      gradient = ctx.createLinearGradient(0, (height - cellHeight)/2 + cellHeight, width, height);
      break;
    default:
      return null;
  }

  // Rainbow colors with white saturation
  gradient.addColorStop(0, 'rgba(255, 100, 100, 0.5)');  // Red with white
  gradient.addColorStop(0.16, 'rgba(255, 200, 100, 0.5)'); // Orange with white
  gradient.addColorStop(0.33, 'rgba(255, 255, 100, 0.5)'); // Yellow with white
  gradient.addColorStop(0.5, 'rgba(100, 255, 100, 0.5)');  // Green with white
  gradient.addColorStop(0.66, 'rgba(100, 200, 255, 0.5)'); // Blue with white
  gradient.addColorStop(0.83, 'rgba(150, 100, 255, 0.5)'); // Indigo with white
  gradient.addColorStop(1, 'rgba(255, 100, 255, 0.5)');    // Violet with white

  return gradient;
};

/**
 * Highlights a section of the grid based on cleave direction
 */
export const highlightCleave = (
  ctx: DrawingContext,
  dimensions: CanvasDimensions,
  direction: 'L' | 'U' | 'R' | 'D'
): void => {
  const { width, height, rows } = dimensions;
  const cellHeight = height / rows;

  const gradient = createRainbowGradient(ctx, dimensions, direction);
  if (!gradient) return;

  ctx.fillStyle = gradient;

  switch(direction) {
    case 'L': // Left half
      ctx.fillRect(0, cellHeight, width/2, height - cellHeight);
      break;
    case 'R': // Right half
      ctx.fillRect(width/2, cellHeight, width/2, height - cellHeight);
      break;
    case 'U': // Upper half (excluding header row)
      ctx.fillRect(0, cellHeight, width, (height - cellHeight)/2);
      break;
    case 'D': // Lower half
      ctx.fillRect(0, cellHeight + (height - cellHeight)/2, width, (height - cellHeight)/2);
      break;
  }
};
