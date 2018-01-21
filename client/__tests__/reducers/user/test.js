import * as mockData from '../../mockDataReducer';
import actionTypes from '../../../src/actions/actionTypes';
import userReducer from '../../../src/reducers/user/userReducer';

const {
  getAllUsers,
  getOneUser,
  usersInitialState,
  userInitialState,
  updateUserState,
  passwordState
} = mockData;


describe('Get all users', () => {
  it('should return an array of all users', () => {
    expect(userReducer(usersInitialState, {
      type: actionTypes.GETUSERS_SUCCESSFUL,
      payload: { users: getAllUsers, pageCount: 1 }
    })).toEqual({
      success: true,
      errors: null,
      users: getAllUsers,
      pageCount: 1
    });
  });
  it('should return no array of users', () => {
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
});

describe('Get single users', () => {
  it('should return a single user', () => {
    expect(userReducer(userInitialState, {
      type: actionTypes.GETONEUSER_SUCCESSFUL,
      payload: getOneUser
    })).toEqual({
      success: true,
      errors: null,
      user: getOneUser,
    });
  });
  it('should return no user', () => {
    expect(userReducer(userInitialState, {
      type: actionTypes.GETONEUSER_UNSUCCESSFUL,
      payload: 'Error, nothing to display'
    })).toEqual({
      success: false,
      errors: 'Error, nothing to display',
      user: null,
    });
  });
});

describe('Update User', () => {
  it('should update user info successfully', () => {
    expect(userReducer(updateUserState, {
      type: actionTypes.UPDATEUSER_SUCCESSFUL,
    })).toEqual({
      success: true,
      errors: null,
      fails: null
    });
  });
  it('should not update user info', () => {
    expect(userReducer(updateUserState, {
      type: actionTypes.UPDATEUSER_UNSUCCESSFUL,
      payload: 'No update done'
    })).toEqual({
      success: false,
      errors: null,
      fails: 'No update done'
    });
  });
  it('should not update user info when there is a validation error', () => {
    expect(userReducer(updateUserState, {
      type: actionTypes.UPDATEUSER_VALIDATION_ERROR,
      payload: 'Validatio error'
    })).toEqual({
      success: false,
      errors: 'Validatio error',
      fails: null
    });
  });
});

describe('Change password', () => {
  it('should change a user\'s password successfully', () => {
    expect(userReducer(passwordState, {
      type: actionTypes.CHANGE_PASSWORD_SUCCESSFUL,
    })).toEqual({
      success: true,
      errors: null,
      fails: null
    });
  });
  it('should not change user password', () => {
    expect(userReducer(passwordState, {
      type: actionTypes.CHANGE_PASSWORD_UNSUCCESSFUL,
      payload: 'Password not changed'
    })).toEqual({
      success: false,
      errors: null,
      fails: 'Password not changed'
    });
  });
  it('should not change user password when there is a validation error', () => {
    expect(userReducer(passwordState, {
      type: actionTypes.CHANGE_PASSWORD_VALIDATION_ERROR,
      payload: 'Validatio error'
    })).toEqual({
      success: false,
      errors: 'Validatio error',
      fails: null
    });
  });
});

describe('Initial state', () => {
  it('should return initialstate when no case matches or is provided', () => {
    expect(userReducer(usersInitialState, {
    })).toEqual({
      success: false,
      users: [],
      errors: null,
      pageCount: null
    });
  });
});
