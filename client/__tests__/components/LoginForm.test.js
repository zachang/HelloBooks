import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import storeConfiguration from '../../src/store/store';
import { LoginForm } from '../../src/components/auth/LoginForm.jsx';

const event = {
  preventDefault: jest.fn(),
  target: {
    username: 'pana8909',
    password: 'passphrase',
  }
};

const response = {
  profileObj: {
    email: 'pana8909@gmail.com',
    familyName: 'Maaten Stance',
    givenName: 'Winnie'
  }
};

describe('<LoginForm/>', () => {
  // create a spy function for signinAction
  const signinAction = sinon.spy();
  // create a spy function for googleSigninAction
  const googleSigninAction = sinon.spy();
  // create a spy function for redirectIfLoggedIn
  const redirectIfLoggedIn = sinon.spy();
  // spy on handleSubmit of Signin Page
  sinon.spy(LoginForm.prototype, 'handleSubmit');
  // spy on handleChange of Signin Page
  sinon.spy(LoginForm.prototype, 'handleChange');
  // spy on responseGoogle of Signin Page
  sinon.spy(LoginForm.prototype, 'isValid');
  // spy on responseGoogle of Signin Page
  sinon.spy(LoginForm.prototype, 'responseGoogle');
  // spy on componentWillMount of Signin Page
  sinon.spy(LoginForm.prototype, 'componentWillMount');
  // spy on componentWillReceiveProps of Signin Page
  sinon.spy(LoginForm.prototype, 'componentWillReceiveProps');

  const props = {
    signinState: {
      success: true,
      fails: null
    },
    signinAction,
    googleSigninAction,
  };

  const token = 'bbjsbjjsjhjnshugbjkgjg';
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  let store;
  let shallowComponent;
  beforeEach(() => {
    store = mockStore(storeConfiguration);
    shallowComponent = shallow(<LoginForm {...props} />);
    sessionStorage.setItem('token', token);
  });

  it('renders <LoginForm /> component', () => {
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });

  it('should check that handleChange is called', () => {
    shallowComponent.instance().handleChange(event);
    expect(LoginForm.prototype.handleChange.calledOnce).toEqual(true);
  });

  it('should check that handleSubmit is called', () => {
    shallowComponent.instance().handleSubmit(event);
    expect(LoginForm.prototype.handleSubmit.calledOnce).toEqual(true);
  });

  it('calls componentWillReceiveProps', () => {
    props.signinState.success = false;
    shallowComponent.setState({
      fails: props.signinState.success
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(LoginForm.prototype.componentWillReceiveProps.calledOnce).toEqual(true);
  });

  it('calls responseGoogle', () => {
    shallowComponent.instance().responseGoogle(response);
    expect(LoginForm.prototype.responseGoogle.calledOnce).toEqual(true);
    expect(googleSigninAction.called).toBe(true);
  });

  it('calls isValid', () => {
    shallowComponent.instance().isValid();
    expect(LoginForm.prototype.isValid.calledOnce).toEqual(true);
  });

  it('Should check that signinAction is called', () => {
    shallowComponent.setState({
      loginCredentials: {
        username: 'zenee09',
        password: 'kookoo',
      },
      errors: {},
      fails: null
    });
    shallowComponent.find('form').simulate('submit', { preventDefault() {} });
    expect(signinAction.called).toBe(true);
  });
});