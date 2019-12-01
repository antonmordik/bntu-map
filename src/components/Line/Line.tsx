import React from 'react';

import './Line.css';

import { IProcessedLine } from '../../interfaces/ILine';

interface ILineProps {
  line: IProcessedLine;
}

const Line: React.FC<ILineProps> = ({ line }) => {
  return (
    <line
      x1={line.dots[0].x}
      y1={line.dots[0].y}
      x2={line.dots[1].x}
      y2={line.dots[1].y}
      stroke="#444444"
      strokeLinecap="round"
      strokeWidth="5"
    />
  );
};

export default Line;
