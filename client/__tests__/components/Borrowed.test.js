import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import storeConfiguration from '../../src/store/store';
import { Borrowed } from '../../src/components/Borrowed.jsx';

describe('<Borrowed/>', () => {
  // create a spy function for viewUserBorrowAction
  const viewUserBorrowAction = sinon.spy();
  // create a spy function for returnBookAction
  const returnBookAction = sinon.spy();
  // spy on componentWillReceiveProps of Borrowed Page
  sinon.spy(Borrowed.prototype, 'componentWillMount');
  // spy on componentWillReceiveProps of Borrowed Page
  sinon.spy(Borrowed.prototype, 'componentWillReceiveProps');
  // spy on componentDidUpdate of Borrowed Page
  sinon.spy(Borrowed.prototype, 'componentDidUpdate');
  // spy on returnBook of Borrowed Page
  sinon.spy(Borrowed.prototype, 'returnBook');

  const props = {
    bookState: {
      success: true,
      errors: null,
      allBorrows: ['mmm'],
      pageCount: null
    },
    showToast: true,
    viewUserBorrowAction,
    returnBookAction
  };

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  let store;
  let shallowComponent;
  beforeEach(() => {
    store = mockStore(storeConfiguration);
    shallowComponent = shallow(<Borrowed {...props} />);
    shallowComponent.setState({
      pageCount: 1,
      allBorrows: ['mmm'],
      showToast: true
    });
  });

  it('renders <Borrowed /> component', () => {
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });

  it('should check that returnBook is called', () => {
    shallowComponent.instance().returnBook(1);
    expect(Borrowed.prototype.returnBook.called).toEqual(true);
  });

  it('calls componentWillReceiveProps when paginating', () => {
    props.pageCount = 1;
    props.bookState.pageCount = 2;
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(Borrowed.prototype.componentWillReceiveProps.called)
      .toEqual(true);
  });

  it(`should check if the 'Pagination' is defined`, () => {
    expect(shallowComponent.find('Pagination').length).toBe(1);
    shallowComponent.find('Pagination').simulate('select');
  });

  it('calls componentWillReceiveProps error when returning books', () => {
    props.bookState.success = false;
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(Borrowed.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('calls componentWillReceiveProps when returning books', () => {
    props.bookState.success = true;
    props.bookState.returned = 'return completed';
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(Borrowed.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('calls componentWillReceiveProps when returning books', () => {
    props.bookState.success = false;
    props.bookState.fails = 'Error returning book';
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(Borrowed.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('calls componentWillReceiveProps when returning books', () => {
    props.bookState.success = false;
    props.bookState.fails = 'Process failed';
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(Borrowed.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('calls componentWillReceiveProps when returning books', () => {
    props.bookState.success = false;
    props.bookState.fails = 'Book already returned';
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(Borrowed.prototype.componentWillReceiveProps.called).toEqual(true);
  });
});