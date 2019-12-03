import { Shapes } from './../defs/shapes';

export interface IBuilding {
  id: string;
  address?: string;
  name?: string;
  path?: string;
  x?: string;
  y?: string;
  transform?: string;
  width?: string;
  height?: string;
  cx?: string;
  cy?: string;
  rx?: string;
  ry?: string;
  shape: Shapes;
  clickable?: boolean;
}
