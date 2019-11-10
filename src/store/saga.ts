import { fork } from 'redux-saga/effects';

import map from './map/saga';

export default function*() {
  yield fork(map);
}
