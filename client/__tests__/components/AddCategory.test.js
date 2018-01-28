import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import storeConfiguration from '../../src/store/store';
import { AddCategory } from '../../src/components/AddCategory.jsx';

const event = {
  preventDefault: jest.fn(),
  target: {
    value: 'mmmmmm'
  }
};

const categoryData = {
  categoryName: '',
};

describe('<AddCategory/>', () => {
  // create a spy function for addCategoryAction
  const addCategoryAction = sinon.spy();
  // spy on handleSubmit of AddCategory Page
  sinon.spy(AddCategory.prototype, 'handleSubmit');
  // spy on handleChange of AddCategory Page
  sinon.spy(AddCategory.prototype, 'handleChange');
  // spy on componentWillReceiveProps of AddCategory Page
  sinon.spy(AddCategory.prototype, 'componentWillReceiveProps');

  const showToast = true;
  const props = {
    categoryState: {
      success: null,
      errors: null,
      fails: null
    },
    showToast,
    addCategoryAction
  };

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  let store;
  let shallowComponent;
  beforeEach(() => {
    store = mockStore(storeConfiguration);
    shallowComponent = shallow(<AddCategory {...props} />);
  });

  it('renders <AddCategory /> component', () => {
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });

  it('Should check that addCategoryAction is called', () => {
    shallowComponent.find('form').simulate('submit', { preventDefault() {} });
    expect(addCategoryAction.called).toBe(true);
  });

  it('should check that handleChange is called', () => {
    shallowComponent.instance().handleChange(event);
    expect(AddCategory.prototype.handleChange.called).toEqual(true);
  });

  it('calls componentWillReceiveProps category created', () => {
    props.categoryState.success = true;
    shallowComponent.setState({
      showToast
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(AddCategory.prototype.componentWillReceiveProps.called)
      .toEqual(true);
  });

  it('calls componentWillReceiveProps book not created', () => {
    props.categoryState.errors = 'Category not added!';
    props.categoryState.success = false;
    shallowComponent.setState({
      errors: props.categoryState.errors,
      showToast
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(AddCategory.prototype.componentWillReceiveProps.called)
      .toEqual(true);
  });
});