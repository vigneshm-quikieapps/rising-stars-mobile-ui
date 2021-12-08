import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const Store = compose(applyMiddleware(sagaMiddleware))(createStore)(
    rootReducer,
  );
  sagaMiddleware.run(rootSaga);
  return {Store};
};
