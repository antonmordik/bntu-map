import React, { useMemo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Building.css';

import { IBuilding } from '../../interfaces/IBuilding';
import { Shapes } from '../../defs/shapes';
import { setActiveBuilding, loadError } from '../../store/map/actions';
import { IGlobalState } from '../../store';

interface IBuildingProps {
  building: IBuilding;
}

const Building: React.FC<IBuildingProps> = ({ building }) => {
  const dispatch = useDispatch();

  const onBuildingClick = useCallback(() => {
    dispatch(loadError({ error: null }));
    dispatch(setActiveBuilding({ activeBuilding: building }));
  }, [building, dispatch]);

  const isSelected = useSelector(
    (state: IGlobalState) =>
      state.map.activeBuilding && state.map.activeBuilding.id === building.id,
  );
  const [isHovered, setHovered] = useState(false);

  const onMouseOver = useCallback(() => setHovered(true), []);
  const onMouseLeave = useCallback(() => setHovered(false), []);

  const classes = useMemo(() => {
    const classList = ['building'];

    if (building.selectable) {
      classList.push('clickable');
    }

    if (isSelected) {
      classList.push('selected');
    }

    if (isHovered) {
      classList.push('hovered');
    }

    return classList.join(' ');
  }, [building.selectable, isHovered, isSelected]);

  switch (building.shape) {
    case Shapes.POLYGON:
      return (
        <polygon
          className={classes}
          points={building.path}
          onClick={building.selectable ? onBuildingClick : undefined}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
        />
      );
    case Shapes.PATH:
      return (
        <path
          className={classes}
          d={building.path}
          onClick={building.selectable ? onBuildingClick : undefined}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
        />
      );
    case Shapes.RECT:
      return (
        <rect
          className={classes}
          x={building.x}
          y={building.y}
          transform={building.transform}
          width={building.width}
          height={building.height}
          onClick={building.selectable ? onBuildingClick : undefined}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
        />
      );
    case Shapes.ELLIPSE:
      return (
        <ellipse
          className={classes}
          cx={building.cx}
          cy={building.cy}
          rx={building.rx}
          ry={building.ry}
          onClick={building.selectable ? onBuildingClick : undefined}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
        />
      );
    default:
      return null;
  }
};

export default Building;
