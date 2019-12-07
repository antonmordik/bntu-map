import { IProcessedLine } from '../interfaces/ILine';

interface IGraph {
  [from: string]: {
    [to: string]: number;
  };
}

export const processLines = (lines: IProcessedLine[]): IGraph => {
  const result: IGraph = {};
  lines.forEach((line) => {
    result[line.dots[0].id] = result[line.dots[0].id]
      ? { ...result[line.dots[0].id], [line.dots[1].id]: line.distance }
      : { [line.dots[1].id]: line.distance };

    result[line.dots[1].id] = result[line.dots[1].id]
      ? { ...result[line.dots[1].id], [line.dots[0].id]: line.distance }
      : { [line.dots[0].id]: line.distance };
    if (!result[line.dots[1].id]) result[line.dots[1].id] = {};
    if (!result[line.dots[0].id]) result[line.dots[1].id] = {};
  });
  return result;
};

export const dijkstra = (
  graph: IGraph,
  from: string,
  to: string,
): { distance: number; path: string[] } => {
  const work: {
    [from: string]: {
      [to: string]: number | boolean | string;
    };
  } = { ...graph };
  const findMin = (work: {
    [from: string]: {
      [to: string]: number | boolean | string;
    };
  }) => {
    const firstElArr = [];
    for (const key in work) {
      firstElArr.push(work[key].passed ? 1 : 0);
    }
    const firstEl = firstElArr.indexOf(0);
    if (firstEl === -1) {
      return null;
    } else {
      let result = Object.keys(work)[firstEl];
      for (const key in work) {
        if (work[key].length < work[result].length && !work[key].passed) {
          result = key;
        }
      }
      work[result].passed = true;
      return result;
    }
  };
  for (const key in work) {
    work[key].length = Infinity;
    work[key].passed = false;
  }
  work[from].length = 0;
  while (true) {
    let min = findMin(work);
    if (min === null) break;
    for (const key in work[min]) {
      if (!['length', 'passed', 'prev'].includes(key)) {
        if (!work[key]) {
          min = null;
          break;
        }
        if (work[key].length > (work[min].length as number) + (work[min][key] as number)) {
          work[key].length = (work[min].length as number) + (work[min][key] as number);
          work[key].prev = min;
        }
      }
    }
  }
  const result = {
    distance: work[to].length as number,
    path: [to],
  };
  let actual = to;
  while (actual !== from) {
    actual = work[actual].prev as string;
    result.path.push(actual);
  }
  result.path = result.path.reverse();
  return result;
};
