import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import './Map.css';

import { ILine, IProcessedLine } from '../../interfaces/ILine';
import { IDot } from '../../interfaces/IDot';
import { IGlobalState } from '../../store';
import Line from '../Line/Line';
import { getDistance } from '../../helpers/distance.helper';
import Dot from '../Dot/Dot';
import Button from '../Button/Button';
import { dijkstra, processLines } from '../../helpers/dijkstra.helper';

const Map: React.FC = () => {
  const lines: IProcessedLine[] = useSelector((state: IGlobalState) => {
    const dots: IDot[] = state.map.dots;
    return state.map.lines.map((line: ILine) => {
      const mapped: any = {
        id: line.id,
        dots: [],
      };
      mapped.dots[0] = dots.find((dot) => dot.id === line.data.dot1) as IDot;
      mapped.dots[1] = dots.find((dot) => dot.id === line.data.dot2) as IDot;
      mapped.distance = getDistance(mapped.dots[0], mapped.dots[1]);
      return mapped;
    });
  });

  const selectableDots: IDot[] = useSelector((state: IGlobalState) =>
    state.map.dots.filter((dot) => dot.selectable),
  );

  const [from, setFrom] = useState<IDot | null>(null);
  const [to, setTo] = useState<IDot | null>(null);

  const onDotSelect = useCallback(
    (dot: IDot) => {
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
      const graph = processLines(lines);
      console.log(graph);
      const result = dijkstra(graph, from.id, to.id);
      console.log(result);
    }
  }, [from, to, lines]);

  return (
    <div className="map">
      <svg viewBox="0 0 400 300" width="800" height="600">
        {lines.map((line) => (
          <Line line={line} key={line.id} />
        ))}

        {selectableDots.map((dot) => (
          <Dot
            dot={dot}
            key={dot.id}
            onClick={() => onDotSelect(dot)}
            selected={[from, to]
              .filter((el) => !!el)
              .map((el) => el && el.id)
              .includes(dot.id)}
          />
        ))}
      </svg>
      <Button onClick={onDijkstraClick}>Dijkstra</Button>
    </div>
  );
};

export default Map;
