import thunk from 'redux-thunk';
import { configure } from 'enzyme';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-15';
import chai from 'chai';
import * as mockData from '../../mockDataActions';
import * as apiEndPoints from '../../apiEndPoints';
import actionTypes from '../../../src/actions/actionTypes';
import signupAction from '../../../src/actions/signupAction';


import mockSessionStorage from '../../mockDataStorage';

window.sessionStorage = mockSessionStorage;


const { expect } = chai;
configure({ adapter: new Adapter() });

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});


describe('THUNK FUNCTIONS', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });


  /** ********************************** */
  /** *** AUTHENTICATION ACTIONS ******* */
  /** ****************************** */
  it('should SIGN_UP_SUCCESFULLY when a user signs up', async (done) => {
    const signupResponse = mockData.signupAction;
    moxios.stubRequest(apiEndPoints.signupAction, {
      status: 201,
      response: signupResponse
    });

    const expectedAction = {
      type: actionTypes.SIGNUP_SUCCESSFUL
    };

    // Dispatch
    await store.dispatch(signupAction(signupResponse)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).to.equal(expectedAction.type);
    });
    done();
  });

  it('should SIGNUP_VALIDATION_ERROR when a user signs up', async (done) => {
    const signupResponse = mockData.signupActionValidationError;
    const signupValidationErrorResponse = mockData.signupValidationErrorResponse;
    moxios.stubRequest(apiEndPoints.signupAction, {
      status: 400,
      response: {
        message: 'Validation error',
        errors: signupValidationErrorResponse.errors
      }
    });

    const expectedAction = {
      type: actionTypes.SIGNUP_VALIDATION_ERROR,
      payload: signupValidationErrorResponse.errors
    };

    // Dispatch
    await store.dispatch(signupAction(signupResponse)).then(() => {
      const actions = store.getActions();
      expect(actions[1].type).to.equal(expectedAction.type);
      expect(actions[1].payload).to.equal(expectedAction.payload);
    });
    done();
  });

  it('should SIGNUP_UNSUCCESSFUL when a user signs up', async (done) => {
    const signupResponse = mockData.signupActionError;
    const signupErrorResponse = mockData.signupErrorResponse;
    moxios.stubRequest(apiEndPoints.signupAction, {
      status: 400,
      response: signupErrorResponse
    });

    const expectedAction = {
      type: actionTypes.SIGNUP_UNSUCCESSFUL,
      payload: signupErrorResponse
    };

    // Dispatch
    await store.dispatch(signupAction(signupResponse)).then(() => {
      const actions = store.getActions();
      expect(actions[2].type).to.equal(expectedAction.type);
      expect(actions[2].payload).to.equal(expectedAction.payload.message);
    });
    done();
  });
});