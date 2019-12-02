import { Action, handleActions } from 'redux-actions';

import { IBuilding } from '../../interfaces/IBuilding';

import { IError } from './../../interfaces/IError';
import { ILine } from './../../interfaces/ILine';
import { IDot } from './../../interfaces/IDot';
import {
  loadDots,
  loadDotsSuccess,
  loadLines,
  loadLinesSuccess,
  loadBuildings,
  loadBuildingsSuccess,
  loadError,
} from './actions';

interface IMapState {
  loading: boolean;
  dots: IDot[];
  lines: ILine[];
  buildings: IBuilding[];
  error: IError | null;
}

const INIT_STATE: IMapState = {
  loading: false,
  dots: [],
  lines: [],
  buildings: [],
  error: null,
};

export default handleActions<IMapState>(
  {
    [loadDots.toString()]: (state) => ({ ...state, loading: true, error: null }),
    [loadDotsSuccess.toString()]: (state, { payload }: Action<{ dots: IDot[] }>) => ({
      ...state,
      dots: payload.dots,
      loading: false,
    }),
    [loadLines.toString()]: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    [loadLinesSuccess.toString()]: (state, { payload }: Action<{ lines: ILine[] }>) => ({
      ...state,
      loading: false,
      lines: payload.lines,
    }),
    [loadBuildings.toString()]: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    [loadBuildingsSuccess.toString()]: (
      state,
      { payload }: Action<{ buildings: IBuilding[] }>,
    ) => ({
      ...state,
      loading: false,
      buildings: payload.buildings,
    }),
    [loadError.toString()]: (state, { payload }: Action<{ error: IError | null }>) => ({
      ...state,
      error: payload.error,
      loading: false,
    }),
  },
  INIT_STATE,
);
