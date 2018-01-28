import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import storeConfiguration from '../../src/store/store';
import { ReturnedList } from '../../src/components/ReturnedList.jsx';

describe('<ReturnedList/>', () => {
  // create a spy function for viewAllReturnedAction
  const viewAllReturnedAction = sinon.spy();
  // create a spy function for confirmReturnAction
  const confirmReturnAction = sinon.spy();
  // spy on confirmReturn of ReturnedList Page
  sinon.spy(ReturnedList.prototype, 'confirmReturn');
  // spy on componentWillMount of ReturnedList Page
  sinon.spy(ReturnedList.prototype, 'componentWillMount');
  // spy on componentWillReceiveProps of ReturnedList Page
  sinon.spy(ReturnedList.prototype, 'componentWillReceiveProps');

  const props = {
    bookState: {
      success: false,
      passes: null,
      errors: null,
      fails: null,
      books: [],
      book: null,
      borrows: null,
      allBorrows: null,
      borrowers: [],
      returned: null,
      returnings: null,
      returners: ['mmmm'],
      pageCount: null,
      confirmReturn: null,
      clickedReturnedBorrowList: [],
      confirmBorrow: null,
      clickedBorrowList: []
    },
    viewAllReturnedAction,
    confirmReturnAction
  };

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  let store;
  let shallowComponent;
  beforeEach(() => {
    store = mockStore(storeConfiguration);
    shallowComponent = shallow(<ReturnedList {...props} />);
    shallowComponent.setState({
      pageCount: 1,
      returners: ['mmm', 'mmmm'],
      showToast: false,
      clickedReturnedBorrowList: []
    });
  });

  it('renders <ReturnedList /> component', () => {
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });

  it('calls componentWillReceiveProps when paginating', () => {
    props.pageCount = 1;
    props.bookState.pageCount = 2;
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(ReturnedList.prototype.componentWillReceiveProps.called)
      .toEqual(true);
  });

  it(`should check if the 'Pagination' is defined`, () => {
    expect(shallowComponent.find('Pagination').length).toBe(1);
    shallowComponent.find('Pagination').simulate('select');
  });

  it('calls componentWillReceiveProps when paginating', () => {
    props.bookState.sucess = false;
    shallowComponent.setState({
      errors: props.bookState.errors
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(ReturnedList.prototype.componentWillReceiveProps.called)
      .toEqual(true);
  });

  it('should check that confirmReturn is called', () => {
    shallowComponent.instance().confirmReturn(1);
    expect(ReturnedList.prototype.confirmReturn.called).toEqual(true);
  });
});