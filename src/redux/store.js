import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from '@redux-saga/core';

import rootReducer from './rootReducer';
import { watcherSaga } from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(watcherSaga);

export default store;
