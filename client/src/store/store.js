import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '../reducers/index';

const store = createStore(reducers, {}, compose(applyMiddleware(logger, thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
export default store;
