export interface Direction {
  direction: 'L' | 'U' | 'R' | 'D';
}

export interface CleaveState {
  sequence: string;
  currentStep: number;
}

export interface CanvasDimensions {
  width: number;
  height: number;
  rows: number;
  cols: number;
}

export interface InputAreaProps {
  value: string;
  error: string;
  currentStep: number;
  onChange: (value: string) => void;
  onReset: () => void;
  onPreviousCleave: () => void;
  onNextCleave: () => void;
}

export interface ButtonAreaProps {
  currentStep: number;
  maxSteps: number;
  onReset: () => void;
  onPreviousCleave: () => void;
  onNextCleave: () => void;
}

export interface GridCanvasProps {
  dimensions: CanvasDimensions;
  cleaveState: CleaveState;
}

export interface TitleBarProps {
  title: string;
}

export type DrawingContext = CanvasRenderingContext2D;
