import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '../reducers/index';

const enhancers = [];
let middleware = {};
if (process.env.NODE_ENV === 'development') {
  if (window.devToolsExtension) {
    enhancers.push(devToolsExtension());
  }
  middleware = applyMiddleware(logger, thunk);
} else {
  middleware = applyMiddleware(thunk);
}
const store = createStore(reducers, {}, compose(middleware, ...enhancers));

export default store;
