import {createStore, compose, applyMiddleware} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import {routerMiddleware} from 'react-router-redux';
import { browserHistory } from 'react-router';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native



function configureStoreProd(initialState) {
  const middlewares = [
    // Add other middleware on this line...
    routerMiddleware(browserHistory),
    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunk,
  ];

  const persistConfig = {
    key: 'root',
    storage,
    blacklist:  ['routing', 'temp', 'reports']
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  let store = createStore(persistedReducer, initialState, compose(
    applyMiddleware(...middlewares)
    ));
  let persistor = persistStore(store);

  return { store, persistor };
}

function configureStoreDev(initialState) {
  const middlewares = [
    // Add other middleware on this line...

    routerMiddleware(browserHistory),
    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    require('redux-immutable-state-invariant').default(),
    thunk,
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const persistConfig = {
    key: 'root',
    storage,
    blacklist:  ['routing', 'temp', 'reports']
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  let store = createStore(persistedReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
    ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  let persistor = persistStore(store);

  return { store, persistor };
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;