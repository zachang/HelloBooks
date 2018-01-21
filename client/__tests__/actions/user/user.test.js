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
  getUserAction,
  getOneUserAction,
  updateUserAction,
  changePasswordAction
} from '../../../src/actions/userAction';
import mockSessionStorage from '../../mockDataStorage';

// mock the sessionStorage
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
  /** ************* USER ACTIONS ************** */
  /** **************************************** */
  // Get all user action
  it('should retrieve all users', async (done) => {
    const getUserResponse = mockData.getUserAction;
    const paginationMeta = mockData.paginationMeta;
    moxios.stubRequest(apiEndPoints.getUserAction, {
      status: 200,
      response: {
        users: getUserResponse,
        paginationMeta
      }
    });

    const expectedAction = {
      type: actionTypes.GETUSERS_SUCCESSFUL,
      users: getUserResponse,
      paginationMeta: {
        pageCount: 1
      }
    };

    // Dispatch
    await store.dispatch(getUserAction(1, 0)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).to.equal(expectedAction.type);
      expect(actions[0].payload.users).to.equal(expectedAction.users);
      expect(actions[0].payload.pageCount).to.equal(expectedAction.paginationMeta.pageCount);
    });
    done();
  });

  it('should not retrieve all users', async (done) => {
    moxios.stubRequest(apiEndPoints.getUserAction, {
      status: 400,
      response: {
        message: 'Users not retrieved'
      }
    });

    const expectedAction = {
      type: actionTypes.GETUSERS_UNSUCCESSFUL,
      message: 'Users not retrieved'
    };

    // Dispatch
    await store.dispatch(getUserAction(1, 0)).then(() => {
      const actions = store.getActions();
      expect(actions[1].type).to.equal(expectedAction.type);
      expect(actions[1].payload).to.equal(expectedAction.message);
    });
    done();
  });

  // Get single user action
  it('should retrieve a user', async (done) => {
    const getSingleUserResponse = mockData.getUserAction[0];
    moxios.stubRequest(apiEndPoints.getOneUserAction, {
      status: 200,
      response: {
        user: getSingleUserResponse
      }
    });

    const expectedAction = {
      type: actionTypes.GETONEUSER_SUCCESSFUL,
      user: getSingleUserResponse
    };

    // Dispatch
    await store.dispatch(getOneUserAction(1)).then(() => {
      const actions = store.getActions();
      expect(actions[2].type).to.equal(expectedAction.type);
      expect(actions[2].payload).to.equal(expectedAction.user);
    });
    done();
  });

  it('should not retrieve a user', async (done) => {
    moxios.stubRequest(apiEndPoints.getOneUserAction, {
      status: 400,
      response: {
        message: 'User not retrieved'
      }
    });

    const expectedAction = {
      type: actionTypes.GETONEUSER_UNSUCCESSFUL,
      message: 'User not retrieved'
    };

    // Dispatch
    await store.dispatch(getOneUserAction(1)).then(() => {
      const actions = store.getActions();
      expect(actions[3].type).to.equal(expectedAction.type);
      expect(actions[3].payload).to.equal(expectedAction.message);
    });
    done();
  });

  // Update user action
  it('should update user', async (done) => {
    const updateUserResponse = mockData.updateUserAction;
    moxios.stubRequest(apiEndPoints.updateUserAction, {
      status: 200,
      response: {
        message: 'User updated'
      }
    });

    const expectedAction = {
      type: actionTypes.UPDATEUSER_SUCCESSFUL,
      message: 'User updated'
    };

    // Dispatch
    await store.dispatch(updateUserAction(updateUserResponse, 1)).then(() => {
      const actions = store.getActions();
      expect(actions[4].type).to.equal(expectedAction.type);
      expect(actions[4].payload).to.equal(expectedAction.message);
    });
    done();
  });

  it('should not update user when validation error', async (done) => {
    const updateUserResponse = mockData.updateUserAction;
    const validationErrorResponse = mockData.validationErrorResponse;
    moxios.stubRequest(apiEndPoints.updateUserAction, {
      status: 400,
      response: {
        message: 'Validation error',
        errors: validationErrorResponse.errors
      }
    });

    const expectedAction = {
      type: actionTypes.UPDATEUSER_VALIDATION_ERROR,
      payload: validationErrorResponse.errors
    };

    // Dispatch
    await store.dispatch(updateUserAction(updateUserResponse, 1)).then(() => {
      const actions = store.getActions();
      expect(actions[5].type).to.equal(expectedAction.type);
      expect(actions[5].payload).to.equal(expectedAction.payload);
    });
    done();
  });

  it('should not update user', async (done) => {
    const updateUserResponse = mockData.updateUserAction;
    const updateUserErrorResponse = mockData.updateUserErrorResponse;
    moxios.stubRequest(apiEndPoints.updateUserAction, {
      status: 400,
      response: updateUserErrorResponse
    });

    const expectedAction = {
      type: actionTypes.UPDATEUSER_UNSUCCESSFUL,
      payload: updateUserErrorResponse.message
    };

    // Dispatch
    await store.dispatch(updateUserAction(updateUserResponse, 1)).then(() => {
      const actions = store.getActions();
      expect(actions[6].type).to.equal(expectedAction.type);
      expect(actions[6].payload).to.equal(expectedAction.payload);
    });
    done();
  });

  // Change password action
  it('should change user password', async (done) => {
    const changePasswordResponse = mockData.changePasswordAction;
    moxios.stubRequest(apiEndPoints.changePasswordAction, {
      status: 200,
      response: {
        message: 'Password Changed'
      }
    });

    const expectedAction = {
      type: actionTypes.CHANGE_PASSWORD_SUCCESSFUL,
      message: 'Password Changed'
    };

    // Dispatch
    await store.dispatch(changePasswordAction(changePasswordResponse)).then(() => {
      const actions = store.getActions();
      expect(actions[7].type).to.equal(expectedAction.type);
      expect(actions[7].payload).to.equal(expectedAction.message);
    });
    done();
  });

  it('should not change user password when validation error', async (done) => {
    const changePasswordResponse = mockData.changePasswordAction;
    const validationErrorResponse = mockData.validationErrorResponse;
    moxios.stubRequest(apiEndPoints.changePasswordAction, {
      status: 400,
      response: {
        message: 'Validation error',
        errors: validationErrorResponse.errors
      }
    });

    const expectedAction = {
      type: actionTypes.CHANGE_PASSWORD_VALIDATION_ERROR,
      payload: validationErrorResponse.errors
    };

    // Dispatch
    await store.dispatch(changePasswordAction(changePasswordResponse)).then(() => {
      const actions = store.getActions();
      expect(actions[8].type).to.equal(expectedAction.type);
      expect(actions[8].payload).to.equal(expectedAction.payload);
    });
    done();
  });

  it('should not change user password', async (done) => {
    const changePasswordResponse = mockData.changePasswordAction;
    const changePasswordUserErrorResponse = mockData.changePasswordUserErrorResponse;
    moxios.stubRequest(apiEndPoints.changePasswordAction, {
      status: 400,
      response: changePasswordUserErrorResponse
    });

    const expectedAction = {
      type: actionTypes.CHANGE_PASSWORD_UNSUCCESSFUL,
      payload: changePasswordUserErrorResponse.message
    };

    // Dispatch
    await store.dispatch(changePasswordAction(changePasswordResponse)).then(() => {
      const actions = store.getActions();
      expect(actions[9].type).to.equal(expectedAction.type);
      expect(actions[9].payload).to.equal(expectedAction.payload);
    });
    done();
  });

  // Get all categoried
});