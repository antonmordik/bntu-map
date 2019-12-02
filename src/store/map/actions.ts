import { createActions } from 'redux-actions';

export const {
  loadDots,
  loadDotsSuccess,
  loadLines,
  loadLinesSuccess,
  loadBuildings,
  loadBuildingsSuccess,
  loadError,
} = createActions(
  'LOAD_DOTS',
  'LOAD_DOTS_SUCCESS',
  'LOAD_LINES',
  'LOAD_LINES_SUCCESS',
  'LOAD_BUILDINGS',
  'LOAD_BUILDINGS_SUCCESS',
  'LOAD_ERROR',
);
