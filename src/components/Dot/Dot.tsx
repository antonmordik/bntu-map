import React from 'react';

import './Dot.css';
import { IDot } from '../../interfaces/IDot';
import { Colors } from '../../defs/colors';

interface IDotProps {
  dot: IDot;
  onClick: (event: React.MouseEvent<SVGCircleElement, MouseEvent>) => void;
  selected: string;
}

const Dot: React.FC<IDotProps> = ({ dot, onClick, selected }) => {
  return (
    <circle
      cx={dot.x}
      cy={dot.y}
      r={2}
      strokeWidth={1}
      onClick={onClick}
      className={selected !== Colors.TRANSPARENT ? 'dot-selected' : 'dot'}
    />
  );
};

export default Dot;
