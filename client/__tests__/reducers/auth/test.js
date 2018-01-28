import * as mockData from '../../mockDataReducer';
import actionTypes from '../../../src/actions/actionTypes';
import signupReducer from '../../../src/reducers/auth/signupReducer';
import signinReducer from '../../../src/reducers/auth/signinReducer';

const {
  signUpInitialState,
  signInInitialState
} = mockData;

describe('User signup', () => {
  it('should signup users', () => {
    expect(signupReducer(signUpInitialState, {
      type: actionTypes.SIGNUP_SUCCESSFUL,
    })).toEqual({
      success: true,
      errors: null,
      fails: null
    });
  });
  it('should not signup users', () => {
    expect(signupReducer(signUpInitialState, {
      type: actionTypes.SIGNUP_UNSUCCESSFUL,
      payload: 'User not created'
    })).toEqual({
      success: false,
      errors: null,
      fails: 'User not created'
    });
  });
  it('should not signup users if validation error', () => {
    expect(signupReducer(signUpInitialState, {
      type: actionTypes.SIGNUP_VALIDATION_ERROR,
      payload: 'Validation error'
    })).toEqual({
      success: false,
      errors: 'Validation error',
      fails: null
    });
  });
});

describe('Initial state', () => {
  it('should return initialstate when no case matches or is provided', () => {
    expect(signupReducer(signUpInitialState, {
    })).toEqual({
      success: false,
      errors: null,
      fails: null,
    });
  });
});

describe('User signin', () => {
  it('should signin users', () => {
    expect(signinReducer(signInInitialState, {
      type: actionTypes.SIGNIN_SUCCESSFUL,
    })).toEqual({
      success: true,
      googleSigned: null,
      fails: null
    });
  });

  it('should not signin users', () => {
    expect(signinReducer(signInInitialState, {
      type: actionTypes.SIGNIN_UNSUCCESSFUL,
      payload: 'Invalid credentials'
    })).toEqual({
      success: false,
      googleSigned: null,
      fails: 'Invalid credentials'
    });
  });
});

describe('Google signin', () => {
  it('should signin users with google', () => {
    expect(signinReducer(signInInitialState, {
      type: actionTypes.SOCIAL_SIGNIN_SUCCESSFUL,
      payload: 'Gmail login successful'
    })).toEqual({
      success: true,
      googleSigned: 'Gmail login successful',
      fails: null
    });
  });
  it('should not signin users with invalid google credentials', () => {
    expect(signinReducer(signInInitialState, {
      type: actionTypes.SOCIAL_SIGNIN_UNSUCCESSFUL,
      payload: 'Gmail login unsuccessful'
    })).toEqual({
      success: false,
      googleSigned: null,
      fails: 'Gmail login unsuccessful'
    });
  });
  it('should clear state', () => {
    expect(signinReducer(signInInitialState, {
      type: actionTypes.CLEAR_SOCIAL_STATE,
    })).toEqual({
      success: false,
      googleSigned: null,
      fails: null
    });
  });
  it('should return initialstate when no case matches or is provided', () => {
    expect(signinReducer(signInInitialState, {
    })).toEqual({
      success: false,
      googleSigned: null,
      fails: null
    });
  });
});