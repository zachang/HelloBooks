import { combineReducers } from 'redux';
import signinReducer from './auth/signinReducer';
import signupReducer from './auth/signupReducer';
import addBookReducer from './book/bookReducer';

export default combineReducers({
  signinReducer,
  signupReducer,
  addBookReducer
});