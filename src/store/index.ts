import { createStore } from 'redux';

import reducer from './reducer';

const store = createStore(reducer);

export type IGlobalState = ReturnType<typeof reducer>;

export { store };
