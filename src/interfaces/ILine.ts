import { IDot } from './IDot';

export interface ILineData {
  dot1: string;
  dot2: string;
  stroke?: number;
}

export interface ILine {
  id: string;
  data: ILineData;
}

export interface IProcessedLine {
  id: string;
  distance: number;
  dots: IDot[];
}
