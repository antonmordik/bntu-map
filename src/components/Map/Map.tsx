import React from 'react';

import './Map.css';
import { useSelector } from 'react-redux';

import { ILine } from '../../interfaces/ILine';
import { IDot } from '../../interfaces/IDot';

const Map: React.FC = () => {
  const lines = useSelector((state: any) => {
    const dots: IDot[] = state.map.dots;
    // console.log(dots);
    return state.map.lines.map((line: ILine) => {
      const mapped: any = {
        id: line.id,
        dots: [],
      };
      mapped.dots[0] = dots.find((dot) => dot.id === line.data.dot1) as IDot;
      mapped.dots[1] = dots.find((dot) => dot.id === line.data.dot2) as IDot;
      return mapped;
    });
  });

  return (
    <div className="map">
      <svg viewBox="0 0 400 300" width="800" height="600">
        {lines.map((line: any) => (
          <line
            x1={line.dots[0].x}
            y1={line.dots[0].y}
            x2={line.dots[1].x}
            y2={line.dots[1].y}
            stroke="#444444"
            strokeLinecap="round"
            strokeWidth="5"
            key={line.id}
          />
        ))}
      </svg>
    </div>
  );
};

export default Map;
