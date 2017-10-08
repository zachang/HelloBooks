import { combineReducers } from 'redux';
import signinReducer from './auth/signinReducer';
import signupReducer from './auth/signupReducer';
import categoryReducer from './category/categoryReducer';
import tokenReducer from './token/tokenReducer';
import bookReducer from './book/bookReducer';

export default combineReducers({
  signinReducer,
  signupReducer,
  bookReducer,
  categoryReducer,
  tokenReducer
});