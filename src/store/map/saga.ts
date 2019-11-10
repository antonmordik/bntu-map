import { takeEvery, put } from 'redux-saga/effects';

import { loadDotsSuccess, loadDots } from './actions';

function* loadDotsSaga() {
  console.log('loading...');
  yield put(loadDotsSuccess({ dots: [] }));
}

export default function*() {
  yield takeEvery(loadDots, loadDotsSaga);
}
