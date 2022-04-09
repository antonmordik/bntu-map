import React, { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Map.css';

import { ILine, IProcessedLine } from '../../interfaces/ILine';
import { IDot } from '../../interfaces/IDot';
import { IGlobalState } from '../../store';
import Line from '../Line/Line';
import { getDistance } from '../../helpers/distance.helper';
import Dot from '../Dot/Dot';
import Button from '../Button/Button';
import { dijkstra, processLines } from '../../helpers/dijkstra.helper';
import Path from '../Path/Path';
import { Colors } from '../../defs/colors';
import Building from '../Building/Building';
import { IBuilding } from '../../interfaces/IBuilding';
import Info from '../Info/Info';
import { IError } from '../../interfaces/IError';
import { loadError } from '../../store/map/actions';

const Map: React.FC = () => {
  const dispatch = useDispatch();
  const lines: IProcessedLine[] = useSelector((state: IGlobalState) => {
    const dots: IDot[] = state.map.dots;
    return state.map.lines.map((line: ILine) => {
      const mapped: { id: string; dots: IDot[]; distance: number } = {
        id: line.id,
        dots: [],
        distance: 0,
      };
      mapped.dots[0] = dots.find((dot) => dot.id === line.dot1) as IDot;
      mapped.dots[1] = dots.find((dot) => dot.id === line.dot2) as IDot;
      mapped.distance = getDistance(mapped.dots[0], mapped.dots[1]);
      return mapped;
    });
  });

  const dots: IDot[] = useSelector((state: IGlobalState) => state.map.dots);

  const buildings: IBuilding[] = useSelector((state: IGlobalState) => state.map.buildings);

  const selectableDots: IDot[] = useSelector((state: IGlobalState) =>
    state.map.dots.filter((dot) => dot.selectable),
  );

  const [from, setFrom] = useState<IDot | null>(null);
  const [to, setTo] = useState<IDot | null>(null);
  const [activePath, setActivePath] = useState<string | null>(null);

  const inputError: IError | null = useMemo(() => {
    return from && to
      ? null
      : {
          code: 'Начальная или конечная точка не выбрана.',
          description: 'Пожалуйста, выберите точки чтобы продолжить.',
        };
  }, [from, to]);

  const onDotSelect = useCallback(
    (dot: IDot) => {
      setActivePath(null);
      if (from && to) {
        setFrom(dot);
        setTo(null);
      } else if (from && !to) {
        setTo(dot);
      } else if (!from && !to) {
        setFrom(dot);
      }
    },
    [setFrom, setTo, from, to],
  );

  const onDijkstraClick = useCallback(() => {
    if (from && to) {
      dispatch(loadError({ error: null }));
      const graph = processLines(lines);
      const result = dijkstra(graph, from.id, to.id);
      const path = result.path
        .map((dotId) => {
          const dot = dots.find((dot) => dot.id === dotId);
          return dot ? `${dot.x},${dot.y}` : '';
        })
        .filter((coordinates) => !!coordinates)
        .join(' ');
      setActivePath(path);
    }
  }, [from, to, lines, dots, dispatch]);

  return (
    <div className="map">
      <Info />
      <svg viewBox="0 0 400 300" width="800" height="600">
        <defs>
          <linearGradient
            id="gradient"
            x1="0"
            y1="100%"
            x2="100%"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={Colors.BLUE} />
            <stop offset="50%" stopColor={Colors.SKY_BLUE} />
            <stop offset="100%" stopColor={Colors.GREEN} />
          </linearGradient>
          <linearGradient
            id="buildings"
            x1="0"
            y1="100%"
            x2="100%"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={'#a8e063'} />
            <stop offset="100%" stopColor={'#56ab2f'} />
          </linearGradient>
        </defs>
        {lines.map((line) => (
          <Line line={line} key={line.id} />
        ))}

        {selectableDots.map((dot) => (
          <Dot
            dot={dot}
            key={dot.id}
            onClick={() => onDotSelect(dot)}
            selected={
              from
                ? from.id === dot.id
                  ? Colors.BLUE
                  : to
                  ? to.id === dot.id
                    ? Colors.GREEN
                    : Colors.TRANSPARENT
                  : Colors.TRANSPARENT
                : Colors.TRANSPARENT
            }
          />
        ))}
        <Path path={activePath} />
        {buildings.map((building) => (
          <Building building={building} key={building.id} />
        ))}
      </svg>
      <Button
        disabled={!from || !to}
        disabledError={inputError || undefined}
        onClick={onDijkstraClick}
      >
        Проложить путь
      </Button>
    </div>
  );
};

export default Map;
