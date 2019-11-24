import { createActions } from 'redux-actions';

export const { loadDots, loadDotsSuccess, loadLines, loadLinesSuccess, loadError } = createActions(
  'LOAD_DOTS',
  'LOAD_DOTS_SUCCESS',
  'LOAD_LINES',
  'LOAD_LINES_SUCCESS',
  'LOAD_ERROR',
);
