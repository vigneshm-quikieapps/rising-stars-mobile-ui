import React from 'react';
import { View, Text } from 'react-native'
import HomeNavigation from './src/Router/Stack/HomeStack';
// import { Store } from './src/redux/configureStore';
import {createStore , applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux';
import rootReducer from './src/redux/rootReducer'; 
import rootSaga from './src/redux/rootSaga'; 

const sagaMiddleware = createSagaMiddleware()

// const Store = compose(applyMiddleware(sagaMiddleware))(createStore)(rootReducer)
const Store = createStore(rootReducer) 

// sagaMiddleware.run(rootSaga)

export default function App() {
  return (
    <Provider store={Store}>
      <HomeNavigation />
    </Provider>
  )
}