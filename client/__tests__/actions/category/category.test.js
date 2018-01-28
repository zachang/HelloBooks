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
  addCategoryAction,
  getCategoryAction
} from '../../../src/actions/categoryAction';
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
  /** ********** CATEGORY ACTIONS ************* */
  /** **************************************** */

  // Add category action
  it('should add a category', async (done) => {
    const addCategoryrResponse = mockData.addCategoryAction;
    moxios.stubRequest(apiEndPoints.addCategoryAction, {
      status: 201,
      response: {
        message: 'Category added'
      }
    });

    const expectedAction = {
      type: actionTypes.ADDCATEGORY_SUCCESSFUL,
      message: 'Category added'
    };

    // Dispatch
    await store.dispatch(addCategoryAction(addCategoryrResponse)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).to.equal(expectedAction.type);
      expect(actions[0].payload).to.equal(expectedAction.message);
    });
    done();
  });


  it('should not add a category when validation error', async (done) => {
    const addCategoryrResponse = mockData.addCategoryAction;
    const validationErrorResponse = mockData.validationErrorResponse;
    moxios.stubRequest(apiEndPoints.addCategoryAction, {
      status: 400,
      response: {
        message: 'Validation error',
        errors: validationErrorResponse.errors
      }
    });

    const expectedAction = {
      type: actionTypes.ADDCATEGORY_VALIDATION_ERROR,
      payload: validationErrorResponse.errors
    };

    // Dispatch
    await store.dispatch(addCategoryAction(addCategoryrResponse)).then(() => {
      const actions = store.getActions();
      expect(actions[1].type).to.equal(expectedAction.type);
      expect(actions[1].payload).to.equal(expectedAction.payload);
    });
    done();
  });

  it('should add a category', async (done) => {
    const addCategoryrResponse = mockData.addCategoryAction;
    const addCategoryErrorResponse = mockData.addCategoryErrorResponse;
    moxios.stubRequest(apiEndPoints.addCategoryAction, {
      status: 400,
      response: addCategoryErrorResponse
    });

    const expectedAction = {
      type: actionTypes.ADDCATEGORY_UNSUCCESSFUL,
      payload: addCategoryErrorResponse.message
    };

    // Dispatch
    await store.dispatch(addCategoryAction(addCategoryrResponse)).then(() => {
      const actions = store.getActions();
      expect(actions[2].type).to.equal(expectedAction.type);
      expect(actions[2].payload).to.equal(expectedAction.payload);
    });
    done();
  });

  // Get all categories
  it('should retrieve all categories ', async (done) => {
    const getCategoryResponse = mockData.getCategoryAction;
    moxios.stubRequest(apiEndPoints.getCategoryAction, {
      status: 200,
      response: {
        category: getCategoryResponse
      }
    });

    const expectedAction = {
      type: actionTypes.GETCATEGORY_SUCCESSFUL,
      payload: getCategoryResponse
    };

    // Dispatch
    await store.dispatch(getCategoryAction()).then(() => {
      const actions = store.getActions();
      expect(actions[3].type).to.equal(expectedAction.type);
      expect(actions[3].payload).to.equal(expectedAction.payload);
    });
    done();
  });

  it('should not retrieve categories', async (done) => {
    const getCategoryErrorResponse = mockData.getCategoryErrorResponse;
    moxios.stubRequest(apiEndPoints.getCategoryAction, {
      status: 400,
      response: {
        message: getCategoryErrorResponse.message
      }
    });

    const expectedAction = {
      type: actionTypes.GETCATEGORY_UNSUCCESSFUL,
      payload: getCategoryErrorResponse.message
    };

    // Dispatch
    await store.dispatch(getCategoryAction()).then(() => {
      const actions = store.getActions();
      expect(actions[4].type).to.equal(expectedAction.type);
      expect(actions[4].payload).to.equal(expectedAction.payload);
    });
    done();
  });
});