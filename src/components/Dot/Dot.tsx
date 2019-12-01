import React from 'react';

import './Dot.css';
import { IDot } from '../../interfaces/IDot';

interface IDotProps {
  dot: IDot;
  onClick: (event: React.MouseEvent<SVGCircleElement, MouseEvent>) => void;
  selected: boolean;
}

const Dot: React.FC<IDotProps> = ({ dot, onClick, selected }) => {
  return (
    <circle
      cx={dot.x}
      cy={dot.y}
      r={2}
      // stroke={'#d2ff00'}
      strokeWidth={1}
      // fill={'#d2ff00'}
      onClick={onClick}
      className={selected ? 'dot-selected' : 'dot'}
    />
  );
};

export default Dot;
