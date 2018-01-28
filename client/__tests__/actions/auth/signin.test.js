import thunk from 'redux-thunk';
import { configure } from 'enzyme';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-15';
import chai from 'chai';
import * as mockData from '../../mockDataActions';
import * as apiEndPoints from '../../apiEndPoints';
import actionTypes from '../../../src/actions/actionTypes';
import {
  signinAction,
  googleSigninAction,
  clearGoogleSigninAction
} from '../../../src/actions/signinAction';


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

  /** ****************************************** */
  /** *** SIGNIN AUTHENTICATION ACTIONS ******* */
  /** **************************************** */

  it('should SIGNIN_SUCCESSFUL when a user sign-in', async (done) => {
    const signinResponse = mockData.signinAction;
    moxios.stubRequest(apiEndPoints.signinAction, {
      status: 200,
      response: signinResponse
    });

    const expectedAction = {
      type: actionTypes.SIGNIN_SUCCESSFUL
    };

    // Dispatch
    await store.dispatch(signinAction(signinResponse)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).to.equal(expectedAction.type);
    });
    done();
  });

  it('should SIGNIN_UNSUCCESSFUL when a user sign-in', async (done) => {
    const signinErrorResponse = mockData.signinErrorResponse;
    moxios.stubRequest(apiEndPoints.signinAction, {
      status: 404,
      response: signinErrorResponse
    });

    const expectedAction = {
      type: actionTypes.SIGNIN_UNSUCCESSFUL,
      payload: signinErrorResponse
    };

    // Dispatch
    await store.dispatch(signinAction(signinErrorResponse)).then(() => {
      const actions = store.getActions();
      expect(actions[1].type).to.equal(expectedAction.type);
      expect(actions[1].payload).to.equal(expectedAction.payload.message);
    });
    done();
  });

  // Google signin test
  it('should login a user successfully when using Google', async (done) => {
    const signinResponse = mockData.googleSigninAction;
    const googleSigninResponse = mockData.googleSigninResponse;
    moxios.stubRequest(apiEndPoints.googleSigninAction, {
      status: 200,
      response: {
        message: googleSigninResponse
      }
    });

    const expectedAction = {
      type: actionTypes.SOCIAL_SIGNIN_SUCCESSFUL,
      payload: googleSigninResponse
    };

    // Dispatch
    await store.dispatch(googleSigninAction(signinResponse)).then(() => {
      const actions = store.getActions();
      expect(actions[3].type).to.equal(expectedAction.type);
      expect(actions[3].payload).to.equal(expectedAction.payload);
    });
    done();
  });

  it('should not login a user successfully when using Google', async (done) => {
    const signinErrorResponse = mockData.signinErrorResponse;
    moxios.stubRequest(apiEndPoints.googleSigninAction, {
      status: 400,
      response: signinErrorResponse
    });

    const expectedAction = {
      type: actionTypes.SOCIAL_SIGNIN_UNSUCCESSFUL,
      payload: signinErrorResponse
    };

    // Dispatch
    await store.dispatch(googleSigninAction(signinErrorResponse)).then(() => {
      const actions = store.getActions();
      expect(actions[4].type).to.equal(expectedAction.type);
      expect(actions[4].payload).to.equal(expectedAction.payload.message);
    });
    done();
  });

  it('should clear googleSignin state', async (done) => {
    const expectedAction = {
      type: actionTypes.CLEAR_SOCIAL_STATE,
    };

    // Dispatch
    await store.dispatch(clearGoogleSigninAction());
    const actions = store.getActions();
    expect(actions[6].type).to.equal(expectedAction.type);
    done();
  });
});