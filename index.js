/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './src/redux/rootReducer';
import rootSaga from './src/redux/rootSaga';
import {createStore, applyMiddleware} from 'redux';
import App from './App';
import {name as appName} from './app.json';

const sagaMiddleware = createSagaMiddleware();
const Store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default function Root() {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Root);
