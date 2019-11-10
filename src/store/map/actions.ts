import { createActions } from 'redux-actions';

export const { loadDots, loadDotsSuccess, loadDotsError } = createActions(
  'LOAD_DOTS',
  'LOAD_DOTS_SUCCESS',
  'LOAD_DOTS_ERROR',
);
