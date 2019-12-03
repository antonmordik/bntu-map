import React, { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import './Building.css';

import { IBuilding } from '../../interfaces/IBuilding';
import { Shapes } from '../../defs/shapes';
import { setActiveBuilding } from '../../store/map/actions';

interface IBuildingProps {
  building: IBuilding;
}

const Building: React.FC<IBuildingProps> = ({ building }) => {
  const dispatch = useDispatch();
  const classes = useMemo(() => (building.clickable ? `building clickable` : 'building'), [
    building.clickable,
  ]);

  const onBuildingClick = useCallback(() => {
    dispatch(setActiveBuilding({ activeBuilding: building }));
  }, [building, dispatch]);

  switch (building.shape) {
    case Shapes.POLYGON:
      return (
        <polygon
          className={classes}
          fill="url(#buildings)"
          points={building.path}
          onClick={onBuildingClick}
        />
      );
    case Shapes.PATH:
      return (
        <path
          className={classes}
          fill="url(#buildings)"
          d={building.path}
          onClick={onBuildingClick}
        />
      );
    case Shapes.RECT:
      return (
        <rect
          className={classes}
          fill="url(#buildings)"
          x={building.x}
          y={building.y}
          transform={building.transform}
          width={building.width}
          height={building.height}
          onClick={onBuildingClick}
        />
      );
    case Shapes.ELLIPSE:
      return (
        <ellipse
          className={classes}
          fill="url(#buildings)"
          cx={building.cx}
          cy={building.cy}
          rx={building.rx}
          ry={building.ry}
          onClick={onBuildingClick}
        />
      );
    default:
      return null;
  }
};

export default Building;
