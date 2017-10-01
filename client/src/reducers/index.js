import { combineReducers } from 'redux';
import signinReducer from './auth/signinReducer';
import signupReducer from './auth/signupReducer';
import addCategoryReducer from './category/categoryReducer';
import tokenReducer from './token/tokenReducer';
import { addBookReducer } from './book/bookReducer';

export default combineReducers({
  signinReducer,
  signupReducer,
  addBookReducer,
  addCategoryReducer,
  tokenReducer
});