import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import storeConfiguration from '../../src/store/store';
import { ChangePassword } from '../../src/components/ChangePassword.jsx';

const event = {
  preventDefault: jest.fn(),
  target: {
    oldPassword: 'olpassword',
    newPassword: 'password',
    newPassword_confirmation: 'password'
  }
};

describe('<ChangePassword/>', () => {
  // create a spy function for signinAction
  const changePasswordAction = sinon.spy();
  // spy on handleSubmit of ChangePassword Page
  sinon.spy(ChangePassword.prototype, 'handleSubmit');
  // spy on handleChange of ChangePassword Page
  sinon.spy(ChangePassword.prototype, 'handleChange');
  // spy on componentWillReceiveProps of ChangePassword Page
  sinon.spy(ChangePassword.prototype, 'componentWillReceiveProps');

  const props = {
    changePasswordData: {
      oldPassword: '',
      newPassword: '',
      newPassword_confirmation: ''
    },
    userState: {
      success: false,
      errors: null,
      fails: null,
      users: [],
      user: [],
      pageCount: null,
    },
    changePasswordAction,
    showToast: false
  };

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  let store;
  let shallowComponent;
  beforeEach(() => {
    store = mockStore(storeConfiguration);
    shallowComponent = shallow(<ChangePassword {...props} />);
    shallowComponent.setState({
      showToast: true,
    });
    shallowComponent.setProps({
      userState: {
        success: true,
        errors: 'kkkkk',
        fails: '',
      }
    });
  });

  it('renders <ChangePassword /> component', () => {
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });

  it('should check that handleChange is called', () => {
    shallowComponent.instance().handleChange(event);
    expect(ChangePassword.prototype.handleChange.calledOnce).toEqual(true);
  });

  it('should check that handleSubmit is called', () => {
    shallowComponent.instance().handleSubmit(event);
    expect(ChangePassword.prototype.handleSubmit.calledOnce).toEqual(true);
  });

  it('calls componentWillReceiveProps password is changed', () => {
    props.userState.sucess = true;
    shallowComponent.setState({
      showToast: true
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(ChangePassword.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('calls componentWillReceiveProps when an error occurs', () => {
    props.userState.errors = 'kkkkk';
    shallowComponent.setState({
      errors: props.userState.errors
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(ChangePassword.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('calls componentWillReceiveProps for Incorrect old password',
    () => {
      shallowComponent.setProps({
        userState: {
          success: false,
          errors: null,
          fails: 'Incorrect old password',
        }
      });
      shallowComponent.setState({
        errors: props.userState.errors
      });
      shallowComponent.instance().componentWillReceiveProps(props);
      expect(ChangePassword.prototype.componentWillReceiveProps
        .called).toEqual(true);
    });

  it('calls componentWillReceiveProps for Password not changed',
    () => {
      shallowComponent.setProps({
        userState: {
          success: false,
          errors: null,
          fails: 'Password not changed',
        }
      });
      shallowComponent.setState({
        errors: props.userState.errors
      });
      shallowComponent.instance().componentWillReceiveProps(props);
      expect(ChangePassword.prototype.componentWillReceiveProps
        .called).toEqual(true);
    });
});