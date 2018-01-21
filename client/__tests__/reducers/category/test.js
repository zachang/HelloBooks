import * as mockData from '../../mockDataReducer';
import actionTypes from '../../../src/actions/actionTypes';
import categoryReducer from '../../../src/reducers/category/categoryReducer';

const {
  categoryInitialState,
  getAllCategories
} = mockData;

describe('Add category', () => {
  it('should add new category', () => {
    expect(categoryReducer(categoryInitialState, {
      type: actionTypes.ADDCATEGORY_SUCCESSFUL,
    })).toEqual({
      success: true,
      errors: null,
      fails: null,
      categories: []
    });
  });
  it('should not add category', () => {
    expect(categoryReducer(categoryInitialState, {
      type: actionTypes.ADDCATEGORY_UNSUCCESSFUL,
      payload: 'Category not created',
    })).toEqual({
      success: false,
      errors: null,
      fails: 'Category not created',
      categories: []
    });
  });
  it('should not add category if validation error', () => {
    expect(categoryReducer(categoryInitialState, {
      type: actionTypes.ADDCATEGORY_VALIDATION_ERROR,
      payload: 'Validation error',
    })).toEqual({
      success: false,
      errors: 'Validation error',
      fails: null,
      categories: []
    });
  });
});

describe('Get all categories', () => {
  it('should add new category', () => {
    expect(categoryReducer(categoryInitialState, {
      type: actionTypes.GETCATEGORY_SUCCESSFUL,
      payload: getAllCategories
    })).toEqual({
      success: true,
      errors: null,
      fails: null,
      categories: getAllCategories
    });
  });
  it('should not add category', () => {
    expect(categoryReducer(categoryInitialState, {
      type: actionTypes.GETCATEGORY_UNSUCCESSFUL,
      payload: 'Cannot display user'
    })).toEqual({
      success: false,
      errors: 'Cannot display user',
      fails: null,
      categories: null
    });
  });
});

describe('Initial state', () => {
  it('should return initialstate when no case matches or is provided', () => {
    expect(categoryReducer(categoryInitialState, {
    })).toEqual({
      success: false,
      errors: null,
      fails: null,
      categories: []
    });
  });
});
