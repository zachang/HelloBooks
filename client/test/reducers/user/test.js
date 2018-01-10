import isEmpty from 'lodash/isEmpty';
import * as mockData from '../mockData';
import actionTypes from '../../src/actions/actionTypes';
import userReducer from '../../src/reducers/user/userReducer';

const {
  getAllUsers,
  getOneUser,
  usersInitialState,
  userInitialState
} = mockData;


describe('Users', () => {
  it('should return no users', () => {
    expect(userReducer(usersInitialState, {
      type: actionTypes.GETUSERS_UNSUCCESSFUL,
      payload: 'Error, no user displayed'
    })).toEqual({
      success: false,
      errors: 'Error, no user displayed',
      users: null,
      pageCount: null
    });
  });
  it('should return an array of all users', () => {
    expect(userReducer(usersInitialState, {
      type: actionTypes.GETUSERS_SUCCESSFUL,
      payload: { users: getAllUsers, pageCount: 2 }
    })).toEqual({
      success: true,
      errors: null,
      users: getAllUsers,
      pageCount: 2
    });
  });
  it('should return a single user', () => {
    expect(userReducer(usersInitialState, {
      type: actionTypes.GETONEUSER_SUCCESSFUL,
      payload: { users: getAllUsers, pageCount: 2 }
    })).toEqual({
      success: true,
      errors: null,
      users: getAllUsers,
      pageCount: 2
    });
  });
});