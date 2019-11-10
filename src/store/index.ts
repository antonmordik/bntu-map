import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();

const getEnhancers = () => applyMiddleware(sagaMiddleware);

const store = createStore(reducer, composeWithDevTools(getEnhancers()));

sagaMiddleware.run(saga);

export { store };
