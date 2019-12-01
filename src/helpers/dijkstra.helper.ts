export const processLines = (lines: any) => {
  const result: any = {};
  lines.forEach((line: any) => {
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

export const dijkstra = (graph: any, from: any, to: any): { distance: number; path: string[] } => {
  const work = { ...graph };
  const findMin = (work: any) => {
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
        if (work[key].length > work[min].length + work[min][key]) {
          work[key].length = work[min].length + work[min][key];
          work[key].prev = min;
        }
      }
    }
  }
  const result = {
    distance: work[to].length,
    path: [to],
  };
  let actual = to;
  while (actual !== from) {
    actual = work[actual].prev;
    result.path.push(actual);
  }
  result.path = result.path.reverse();
  return result;
};
