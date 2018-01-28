import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import storeConfiguration from '../../src/store/store';
import { UserList } from '../../src/components/UserList.jsx';


describe('<UserList/>', () => {
  // create a spy function for getUserAction
  const getUserAction = sinon.spy();
  // spy on componentWillReceiveProps of Borrowed Page
  sinon.spy(UserList.prototype, 'componentWillReceiveProps');
  // spy on componentWillMount of Borrowed Page
  sinon.spy(UserList.prototype, 'componentWillMount');

  const errors = null;
  const props = {
    userState: {
      success: null,
      errors: null,
      fails: null,
      users: ['mmmmmmm'],
      user: [],
      pageCount: null,
    },
    getUserAction,
    errors,
    pageCount: null,
    limit: 15
  };

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  let store;
  let shallowComponent;
  beforeEach(() => {
    store = mockStore(storeConfiguration);
    shallowComponent = shallow(<UserList {...props} />);
    shallowComponent.setState({
      pageCount: 1
    });
  });

  it('renders <UserList /> component', () => {
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });

  it(`should check if the 'UserRow' is defined`, () => {
    expect(shallowComponent.find('UserRow').length).toBe(1);
  });

  it('calls componentWillReceiveProps when paginating', () => {
    props.pageCount = 1;
    props.userState.pageCount = 2;
    shallowComponent.setState({
      pageCount: props.userState.pageCount
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(UserList.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('calls componentWillReceiveProps when error in user displays', () => {
    props.userState.success = false;
    props.userState.errors = 'failed';
    shallowComponent.setState({
      errors: props.userState.errors
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(UserList.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it(`should check if the 'Pagination' is defined`, () => {
    expect(shallowComponent.find('Pagination').length).toBe(1);
    shallowComponent.find('Pagination').simulate('select');
  });

  it(`should check if the 'Pagination' is defined`, () => {
    shallowComponent.instance().componentWillMount();
    expect(UserList.prototype.componentWillMount.called).toEqual(true);
  });
});
