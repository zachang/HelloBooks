import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import storeConfiguration from '../../src/store/store';
import { Admin } from '../../src/components/Admin.jsx';

const event = {
  preventDefault: jest.fn(),
  target: {
    value: 'mmmmmm'
  }
};

describe('<Admin/>', () => {
  // create a spy function for getBookAction
  const getBookAction = sinon.spy();
  // create a spy function for getCategoryAction
  const getCategoryAction = sinon.spy();
  // create a spy function for deleteBookAction
  const deleteBookAction = sinon.spy();
  // spy on componentDidUpdate of User Page
  sinon.spy(Admin.prototype, 'componentDidUpdate');
  // spy on bookCategoryChange of User Page
  sinon.spy(Admin.prototype, 'bookCategoryChange');
  // spy on readBook of User Page
  sinon.spy(Admin.prototype, 'readBook');
  // spy on editBook of User Page
  sinon.spy(Admin.prototype, 'editBook');
  // spy on deleteBook of User Page
  sinon.spy(Admin.prototype, 'deleteBook');
  // spy on componentWillReceiveProps of User Page
  sinon.spy(Admin.prototype, 'componentWillReceiveProps');

  const props = {
    bookState: {
      success: null,
      errors: null,
      books: ['nnnnn'],
      pageCount: null,
      borrows: null,
      fails: null
    },
    categoryState: {
      success: false,
      errors: null,
      categories: []
    },
    categoryId: '',
    getBookAction,
    getCategoryAction,
    deleteBookAction,
    pageCount: null,
    showToast: false
  };

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  let store;
  let shallowComponent;
  beforeEach(() => {
    store = mockStore(storeConfiguration);
    shallowComponent = shallow(<Admin {...props} />);
    shallowComponent.setState({
      pageCount: 1,
      categories: ['mmm', 'mmmm'],
    });
  });

  it('renders <Admin /> component', () => {
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });

  it('calls componentDidMount', () => {
    shallowComponent.instance().componentDidUpdate(props);
    expect(Admin.prototype.componentDidUpdate.called).toEqual(true);
  });

  it('should check that readBook is called', () => {
    shallowComponent.instance().readBook();
    expect(Admin.prototype.readBook.called).toEqual(true);
  });

  it('should check that editBook is called', () => {
    shallowComponent.instance().editBook();
    expect(Admin.prototype.editBook.called).toEqual(true);
  });

  it('should check that deleteBook is called', () => {
    shallowComponent.instance().deleteBook();
    expect(Admin.prototype.deleteBook.called).toEqual(true);
  });

  it('should check that bookCategoryChange is called', () => {
    shallowComponent.instance().bookCategoryChange(event);
    expect(Admin.prototype.bookCategoryChange.called).toEqual(true);
  });

  it('calls componentWillReceiveProps when paginating', () => {
    props.pageCount = 1;
    props.bookState.pageCount = 2;
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(Admin.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('calls componentWillReceiveProps when books are not retrieved', () => {
    props.bookState.success = false;
    shallowComponent.setState({
      errors: props.bookState.errors
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(Admin.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('calls componentWillReceiveProps when books are retrieved', () => {
    props.bookState.success = true;
    props.bookState.fails = null;
    shallowComponent.setState({
      errors: props.bookState.errors,
      showToast: true
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(Admin.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it(`should check if the 'Pagination' is defined`, () => {
    expect(shallowComponent.find('Pagination').length).toBe(1);
    shallowComponent.find('Pagination').simulate('select');
  });
});