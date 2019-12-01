import { chain } from 'mathjs';

import { IDot } from './../interfaces/IDot';

export const getDistance = (from: IDot, to: IDot) => {
  const width = chain(from.y)
    .subtract(to.y)
    .abs()
    .square()
    .done();
  const height = chain(from.x)
    .subtract(to.x)
    .abs()
    .square()
    .done();
  return chain(width)
    .add(height)
    .sqrt()
    .format((value: number) => +value.toFixed(2))
    .done();
};
