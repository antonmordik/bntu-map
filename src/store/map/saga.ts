import { takeEvery, put, call } from 'redux-saga/effects';

import Firebase from '../../firebase';

import { IDot } from './../../interfaces/IDot';
import { loadDotsSuccess, loadDots, loadDotsError } from './actions';

function* loadDotsSaga() {
  try {
    const dots: IDot[] = yield call(Firebase.getDots);
    yield put(loadDotsSuccess({ dots: dots }));
  } catch (error) {
    yield put(loadDotsError({ error }));
  }
}

export default function*() {
  yield takeEvery(loadDots, loadDotsSaga);
}
