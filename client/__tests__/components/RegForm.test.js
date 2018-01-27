import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import storeConfiguration from '../../src/store/store';
import { RegForm } from '../../src/components/auth/RegForm.jsx';

const event = {
  preventDefault: jest.fn(),
  target: {
    username: 'pana8909',
    password: 'passphrase'
  }
};

describe('<RegForm/>', () => {
  // create a spy function for signinAction
  const signupAction = sinon.spy();
  // spy on handleSubmit of Signup Page
  sinon.spy(RegForm.prototype, 'handleSubmit');
  // spy on handleChange of Signup Page
  sinon.spy(RegForm.prototype, 'handleChange');
  // spy on componentWillMount of Signup Page
  sinon.spy(RegForm.prototype, 'componentWillMount');
  // spy on componentWillReceiveProps of Signup Page
  sinon.spy(RegForm.prototype, 'componentWillReceiveProps');

  const props = {
    signupState: {
      success: null,
      errors: null,
      fails: null
    },
    signupAction
  };

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  let store;
  let shallowComponent;
  beforeEach(() => {
    store = mockStore(storeConfiguration);
    shallowComponent = shallow(<RegForm {...props} />);
  });

  it('renders <RegForm /> component', () => {
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });

  it('should check that handleChange is called', () => {
    shallowComponent.instance().handleChange(event);
    expect(RegForm.prototype.handleChange.calledOnce).toEqual(true);
  });

  it('should check that handleSubmit is called', () => {
    shallowComponent.instance().handleSubmit(event);
    expect(RegForm.prototype.handleSubmit.calledOnce).toEqual(true);
  });

  it('calls componentWillReceiveProps user already exist', () => {
    props.signupState.fails = 'Email already exist';
    shallowComponent.setState({
      fails: props.signupState.fails,
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(RegForm.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('calls componentWillReceiveProps when validation errors', () => {
    props.signupState.fails = 'Nothingness';
    props.signupState.sucess = false;
    props.signupState.errors = {
      fullname: null,
      username: null,
      email: null,
      phoneNo: null,
      password: null,
      password_confirmation: null,
    };

    shallowComponent.setState({
      errors: props.signupState.errors
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(RegForm.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('Should check that signupAction is called', () => {
    shallowComponent.find('form').simulate('submit', { preventDefault() {} });
    expect(signupAction.called).toBe(true);
  });
});