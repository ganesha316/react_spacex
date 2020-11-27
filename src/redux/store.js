import {combineReducers, createStore, applyMiddleware} from 'redux';
import createSaga from 'redux-saga';
import { LaunchReducers } from './LaunchReducers';
import { rootSaga } from './RootSaga';

var sagaMiddleware = createSaga();

var reducers = combineReducers({LaunchReducers});

var store = createStore(reducers,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;