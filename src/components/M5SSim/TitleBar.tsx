import React from 'react';
import { TitleBarProps } from './types';

const TitleBar: React.FC<TitleBarProps> = ({ title }) => {
  return (
    <div className="bg-blue-500 text-white p-4 text-center text-xl font-bold">
      {title}
    </div>
  );
};

export default TitleBar;
