import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import storeConfiguration from '../../src/store/store';
import { BorrowList } from '../../src/components/BorrowList.jsx';

describe('<BorrowList/>', () => {
  // create a spy function for viewAllBorrowAction
  const viewAllBorrowAction = sinon.spy();
  // create a spy function for confirmBorrowAction
  const confirmBorrowAction = sinon.spy();
  // spy on confirmReturn of BorrowList Page
  sinon.spy(BorrowList.prototype, 'confirmBorrow');
  // spy on componentWillMount of BorrowList Page
  sinon.spy(BorrowList.prototype, 'componentWillMount');
  // spy on componentWillReceiveProps of BorrowList Page
  sinon.spy(BorrowList.prototype, 'componentWillReceiveProps');

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
      borrowers: ['mmmm'],
      returned: null,
      returnings: null,
      returners: ['mmmm'],
      pageCount: null,
      confirmReturn: null,
      clickedReturnedBorrowList: [],
      confirmBorrow: null,
      clickedBorrowList: []
    },
    showToast: true,
    viewAllBorrowAction,
    confirmBorrowAction
  };

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  let store;
  let shallowComponent;
  beforeEach(() => {
    store = mockStore(storeConfiguration);
    shallowComponent = shallow(<BorrowList {...props} />);
    shallowComponent.setState({
      pageCount: 1,
      borrowers: ['mmm'],
      showToast: true,
      clickedBorrowList: []
    });
  });

  it('renders <BorrowList /> component', () => {
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });

  it('calls componentWillReceiveProps when paginating', () => {
    props.pageCount = 1;
    props.bookState.pageCount = 2;
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(BorrowList.prototype.componentWillReceiveProps.called).toEqual(true);
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
    expect(BorrowList.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('should check that confirmReturn is called', () => {
    shallowComponent.instance().confirmBorrow(1);
    expect(BorrowList.prototype.confirmBorrow.called).toEqual(true);
  });
});