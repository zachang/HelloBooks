import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import storeConfiguration from '../../src/store/store';
import { Borrowed } from '../../src/components/Borrowed.jsx';


describe('<User/>', () => {
  // create a spy function for returnBookAction
  const returnBookAction = sinon.spy();
  // create a spy function for viewUserBorrowAction
  const viewUserBorrowAction = sinon.spy();
  // create a spy function for borrowBookAction
  const borrowBookAction = sinon.spy();
  // spy on componentDidUpdate of Borrowed Page
  sinon.spy(Borrowed.prototype, 'componentDidUpdate');
  // spy on returnBook of Borrowed Page
  sinon.spy(Borrowed.prototype, 'returnBook');
  // spy on componentWillReceiveProps of Borrowed Page
  sinon.spy(Borrowed.prototype, 'componentWillReceiveProps');

  const props = {
    bookState: {
      success: null,
      errors: null,
      books: ['nnnnn'],
      pageCount: null,
      borrows: null,
      fails: null
    },
    categoryId: '',
    borrowBookAction,
    viewUserBorrowAction,
    pageCount: null,
    showToast: false,
  };

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  let store;
  let shallowComponent;
  beforeEach(() => {
    store = mockStore(storeConfiguration);
    shallowComponent = shallow(<Borrowed {...props} />);
  });

  it('renders <Borrowed /> component', () => {
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });
});
