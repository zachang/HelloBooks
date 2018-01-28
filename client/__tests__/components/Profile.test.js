import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import storeConfiguration from '../../src/store/store';
import { Profile } from '../../src/components/Profile.jsx';


const event = {
  preventDefault: jest.fn(),
  target: {
    value: 'mmmmmm',
    files: ['eben.jpg']
  }
};

const blob = new Blob(['Baked.jpg'], { type: 'image/jpeg' });
blob.name = "file.png";
const eventImage = {
  preventDefault: jest.fn(),
  target: {
    files: [blob]
  }
};

const userData = {
  fullname: '',
  username: '',
  email: '',
  phoneNo: '',
  userImage: '',
  userImage_txt: ''
};

describe('<Profile/>', () => {
  // create a spy function for getOneUserAction
  const getOneUserAction = sinon.spy();
  // create a spy function for getCategoryAction
  const updateUserAction = sinon.spy();
  // spy on handleImageChange of Profile Page
  sinon.spy(Profile.prototype, 'handleImageChange');
  // spy on handleSubmit of Profile Page
  sinon.spy(Profile.prototype, 'handleSubmit');
  // spy on handleChange of Profile Page
  sinon.spy(Profile.prototype, 'handleChange');
  // spy on componentWillMount of Profile Page
  sinon.spy(Profile.prototype, 'componentWillMount');
  // spy on componentWillReceiveProps of Profile Page
  sinon.spy(Profile.prototype, 'componentWillReceiveProps');

  const showToast = true;
  const props = {
    userState: {
      success: false,
      errors: null,
      fails: null,
      users: [],
      user: [],
      pageCount: null,
    },
    showToast,
    getOneUserAction,
    updateUserAction
  };

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  let store;
  let shallowComponent;
  beforeEach(() => {
    store = mockStore(storeConfiguration);
    shallowComponent = shallow(<Profile {...props} />);
  });

  it('renders <Profile /> component', () => {
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });

  it('should check that handleSubmit is called', () => {
    shallowComponent.instance().handleSubmit(event);
    expect(Profile.prototype.handleSubmit.called).toEqual(true);
  });

  it('should check that handleImageChange is called', () => {
    shallowComponent.instance().handleImageChange(eventImage);
    expect(Profile.prototype.handleImageChange.called).toEqual(true);
  });

  it('should check that handleChange is called', () => {
    shallowComponent.instance().handleChange(event);
    expect(Profile.prototype.handleChange.called).toEqual(true);
  });

  it('calls componentWillReceiveProps when profile update', () => {
    props.userState.success = true;
    shallowComponent.setState({
      errors: {
        fullname: 'kkk',
        username: 'kkkk',
        email: 'mmm',
        phoneNo: 'mmm',
        userImage: 'mmm',
        userImage_txt: 'mmmm'
      },
      userData: {
        fullname: 'mmmmmmmm',
        username: '',
        email: '',
        phoneNo: '',
        userImage: '',
        userImage_txt: ''
      },
      imagePreviewUrl: '',
      showToast: true
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(Profile.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('calls componentWillReceiveProps when error on profile update', () => {
    props.userState.success = false;
    props.userState.errors = 'Error, No update done';
    shallowComponent.setState({
      errors: {
        fullname: 'kkk',
        username: 'kkkk',
        email: 'mmm',
        phoneNo: 'mmm',
        userImage: 'mmm',
        userImage_txt: 'mmmm'
      },
      userData: {
        fullname: 'mmmmmmmm',
        username: '',
        email: '',
        phoneNo: '',
        userImage: '',
        userImage_txt: ''
      },
      imagePreviewUrl: '',
      showToast: true
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(Profile.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('calls componentWillReceiveProps when error on profile update', () => {
    props.userState.success = false;
    props.userState.errors = 'Error';
    shallowComponent.setState({
      errors: {
        fullname: 'kkk',
        username: 'kkkk',
        email: 'mmm',
        phoneNo: 'mmm',
        userImage: 'mmm',
        userImage_txt: 'mmmm'
      },
      userData: {
        fullname: 'mmmmmmmm',
        username: '',
        email: '',
        phoneNo: '',
        userImage: '',
        userImage_txt: ''
      },
      imagePreviewUrl: '',
      showToast: true
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(Profile.prototype.componentWillReceiveProps.called).toEqual(true);
  });
});