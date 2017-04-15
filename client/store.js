import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from './root-reducer';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, compose (
  applyMiddleware(logger, sagaMiddleware)
));

sagaMiddleware.run(rootSaga);
export default store;
