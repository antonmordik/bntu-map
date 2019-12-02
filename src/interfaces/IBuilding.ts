import { Shapes } from './../defs/shapes';

export interface IBuilding {
  id: string;
  address: string;
  name: string;
  path: string;
  shape: Shapes;
}
