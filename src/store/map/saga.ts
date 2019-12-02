import { takeEvery, put, call } from 'redux-saga/effects';

import Firebase from '../../firebase';

import { IBuilding } from './../../interfaces/IBuilding';
import { ILine } from './../../interfaces/ILine';
import { IDot } from './../../interfaces/IDot';
import {
  loadDotsSuccess,
  loadDots,
  loadError,
  loadLinesSuccess,
  loadLines,
  loadBuildingsSuccess,
  loadBuildings,
} from './actions';

function* loadDotsSaga() {
  try {
    const dots: IDot[] = yield call(Firebase.getDots);
    yield put(loadDotsSuccess({ dots: dots }));
  } catch (error) {
    yield put(loadError({ error }));
  }
}

function* loadLinesSaga() {
  try {
    const lines: ILine[] = yield call(Firebase.getLines);
    yield put(loadLinesSuccess({ lines }));
  } catch (error) {
    yield put(loadError({ error }));
  }
}

function* loadBuildingsSaga() {
  try {
    const buildings: IBuilding[] = yield call(Firebase.getBuildings);
    yield put(loadBuildingsSuccess({ buildings }));
  } catch (error) {
    yield put(loadError({ error }));
  }
}

export default function*() {
  yield takeEvery(loadDots, loadDotsSaga);
  yield takeEvery(loadLines, loadLinesSaga);
  yield takeEvery(loadBuildings, loadBuildingsSaga);
}
