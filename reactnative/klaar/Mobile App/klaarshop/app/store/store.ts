import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware, {
  SagaMiddleware,
  SagaMiddlewareOptions,
} from 'redux-saga';
import {getConfig} from '~/config/Config';
import {rootReducer} from './reducers';

let sagaMiddleware: SagaMiddleware;

export function getSagaMiddleware(): SagaMiddleware {
  return sagaMiddleware;
}

function getDefaultMiddleware() {
  const middleware = [];
  let options: SagaMiddlewareOptions;

  if (__DEV__ || getConfig().useReactotron) {
    const reactotron = require('~/config/ReactotronConfig').reactotron;
    const sagaMonitor = reactotron.createSagaMonitor();
    options = {sagaMonitor};
  } else {
    options = {};
  }
  sagaMiddleware = createSagaMiddleware(options);
  middleware.push(sagaMiddleware);
  return middleware;
}

function getDefaultEnhancers() {
  const enhancers = [];

  if (__DEV__ || getConfig().useReactotron) {
    const reactotron = require('~/config/ReactotronConfig').reactotron;
    enhancers.push(reactotron.createEnhancer());
  }
  return enhancers;
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware(),
  enhancers: getDefaultEnhancers(),
});

export type RootStore = typeof store;
