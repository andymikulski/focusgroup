import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import { devTools } from 'redux-devtools';
import { createHashHistory as createHistory } from 'history';
// import createLogger from 'redux-logger';
import routes from '../Routes';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { persistentStore } from 'redux-pouchdb';
import PouchDB from 'pouchdb';

export const seshDB = new PouchDB('testsessionwoahhh', {
  auto_compaction: true
});

// TODO: rethink about logger
const finalCreateStore = compose(
  applyMiddleware(thunk),
  persistentStore(seshDB),
  reduxReactRouter({ routes, createHistory }),
  devTools(),
  // applyMiddleware(createLogger()),
)(createStore);

const store = finalCreateStore(rootReducer);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers');
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
