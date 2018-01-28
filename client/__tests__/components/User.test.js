import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import storeConfiguration from '../../src/store/store';
import { User } from '../../src/components/User.jsx';

const event = {
  preventDefault: jest.fn(),
  target: {
    value: 'mmmmmm'
  }
};

describe('<User/>', () => {
  // create a spy function for getBookAction
  const getBookAction = sinon.spy();
  // create a spy function for getCategoryAction
  const getCategoryAction = sinon.spy();
  // create a spy function for clearGoogleSigninAction
  const clearGoogleSigninAction = sinon.spy();
  // create a spy function for borrowBookAction
  const borrowBookAction = sinon.spy();
  // spy on componentDidMount of User Page
  sinon.spy(User.prototype, 'componentDidMount');
  // spy on bookCategoryChange of User Page
  sinon.spy(User.prototype, 'bookCategoryChange');
  // spy on borrowBook of User Page
  sinon.spy(User.prototype, 'borrowBook');
  // spy on readBook of User Page
  sinon.spy(User.prototype, 'readBook');
  // spy on componentWillReceiveProps of User Page
  sinon.spy(User.prototype, 'componentWillReceiveProps');

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
    signinState: {
      success: false,
      googleSigned: null,
      fails: null,
    },
    categoryId: '',
    getBookAction,
    getCategoryAction,
    clearGoogleSigninAction,
    borrowBookAction,
    pageCount: null,
    showToast: false,
  };

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  let store;
  let shallowComponent;
  beforeEach(() => {
    store = mockStore(storeConfiguration);
    shallowComponent = shallow(<User {...props} />);
    shallowComponent.setState({
      pageCount: 1,
      categories: ['mmm', 'mmmm'],
      showToast: false,
    });
  });

  it('renders <User /> component', () => {
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });

  it('calls componentDidMount', () => {
    shallowComponent.instance().componentDidMount(props);
    expect(User.prototype.componentDidMount.called).toEqual(true);
  });

  it('should check that bookCategoryChange is called', () => {
    shallowComponent.instance().bookCategoryChange(event);
    expect(User.prototype.bookCategoryChange.called).toEqual(true);
  });

  it('should check that readBook is called', () => {
    shallowComponent.instance().readBook();
    expect(User.prototype.readBook.called).toEqual(true);
  });

  it('should check that borrowBook is called', () => {
    shallowComponent.instance().borrowBook(token, 1);
    expect(User.prototype.borrowBook.called).toEqual(true);
  });

  it('calls componentWillReceiveProps when books are retrieved', () => {
    props.bookState.success = false;
    shallowComponent.setState({
      errors: props.bookState.errors
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(User.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('calls componentWillReceiveProps when borrowing a book', () => {
    props.bookState.borrows = 'Borrow completed';
    shallowComponent.setState({
      showToast: true
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(User.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('calls componentWillReceiveProps when book not returned', () => {
    props.bookState.fails = 'You have not returned ' +
      'the previous book you borrowed';
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(User.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('calls componentWillReceiveProps when book not available', () => {
    props.bookState.fails = 'All books have been borrowed';
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(User.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('calls componentWillReceiveProps when borrow fails', () => {
    props.bookState.fails = 'Process failed';
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(User.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('calls componentWillReceiveProps when gmail login', () => {
    props.signinState.googleSigned = 'Gmail login successful';
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(User.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('calls componentWillReceiveProps when paginating', () => {
    props.pageCount = 1;
    props.bookState.pageCount = 2;
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(User.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it(`should check if the 'BookCardUser' is defined`, () => {
    expect(shallowComponent.find('BookCardUser').length).toBe(1);
  });

  it(`should check if the 'BookCardUser' is defined`, () => {
    expect(shallowComponent.find('BookCardUser').length).toBe(1);
  });

  it(`should check if the 'Pagination' is defined`, () => {
    expect(shallowComponent.find('Pagination').length).toBe(1);
    shallowComponent.find('Pagination').simulate('select');
  });
});
