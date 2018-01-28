import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import storeConfiguration from '../../src/store/store';
import { UpdateBook } from '../../src/components/UpdateBook.jsx';

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

const bookData = {
  bookName: '',
  author: '',
  bookCount: '',
  categoryId: '',
  publishYear: '',
  isbn: '',
  pages: '',
  description: '',
  bookImage: '',
  bookImage_text: '',
  bookContent: '',
  bookContent_text: ''
};

describe('<UpdateBook/>', () => {
  // create a spy function for updateBookAction
  const updateBookAction = sinon.spy();
  // create a spy function for getCategoryAction
  const getCategoryAction = sinon.spy();
  // create a spy function for getCategoryAction
  const getOneBookAction = sinon.spy();
  // spy on handleFileChange of UpdateBook Page
  sinon.spy(UpdateBook.prototype, 'handleFileChange');
  // spy on handleImageChange of UpdateBook Page
  sinon.spy(UpdateBook.prototype, 'handleImageChange');
  // spy on handleSubmit of UpdateBook Page
  sinon.spy(UpdateBook.prototype, 'handleSubmit');
  // spy on handleChange of UpdateBook Page
  sinon.spy(UpdateBook.prototype, 'handleChange');
  // spy on componentWillMount of UpdateBook Page
  sinon.spy(UpdateBook.prototype, 'componentWillMount');
  // spy on componentDidUpdate of UpdateBook Page
  sinon.spy(UpdateBook.prototype, 'componentDidUpdate');
  // spy on componentWillReceiveProps of UpdateBook Page
  sinon.spy(UpdateBook.prototype, 'componentWillReceiveProps');

  const showToast = true;
  const props = {
    bookState: {
      success: null,
      errors: null,
      passes: null
    },
    categoryState: {
      success: null,
      errors: null,
      fails: null,
      categories: ['Science', 'Art']
    },
    bookData: {
      bookImage: event.target.files,
    },
    showToast,
    updateBookAction,
    getCategoryAction,
    getOneBookAction,
    params: {
      id: 1
    }
  };

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  let store;
  let shallowComponent;
  beforeEach(() => {
    store = mockStore(storeConfiguration);
    shallowComponent = shallow(<UpdateBook {...props} />);
  });

  it('renders <UpdateBook /> component', () => {
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });

  it('Should check that updateBookAction is called', () => {
    shallowComponent.find('form').simulate('submit', { preventDefault() {} });
    expect(updateBookAction.called).toBe(true);
  });

  it('should check that handleSubmit is called', () => {
    shallowComponent.instance().handleSubmit(event);
    expect(UpdateBook.prototype.handleSubmit.called).toEqual(true);
  });

  it('should check that handleChange is called', () => {
    shallowComponent.instance().handleChange(event);
    expect(UpdateBook.prototype.handleChange.called).toEqual(true);
  });

  it('should check that handleImageChange is called', () => {
    shallowComponent.setState({
      bookData,
      imagePreviewUrl: 'kkkkkk'
    });
    shallowComponent.instance().handleImageChange(eventImage);
    expect(UpdateBook.prototype.handleImageChange.called).toEqual(true);
  });

  it('should check that handleImageChange is called', () => {
    shallowComponent.instance().handleFileChange(event);
    expect(UpdateBook.prototype.handleFileChange.called).toEqual(true);
  });

  it('calls componentWillReceiveProps book created', () => {
    props.bookState.success = true;
    shallowComponent.setState({
      imagePreviewUrl: '',
      categories: props.categoryState.categories,
      showToast
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(UpdateBook.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('calls componentWillReceiveProps book not created', () => {
    props.bookState.errors = 'Book not created';
    props.bookState.success = false;
    shallowComponent.setState({
      categories: props.categoryState.categories,
      showToast
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(UpdateBook.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('calls componentWillReceiveProps book not created', () => {
    props.bookState.errors = 'mmmmmmmmm';
    props.bookState.success = false;
    shallowComponent.setState({
      categories: props.categoryState.categories,
      showToast
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(UpdateBook.prototype.componentWillReceiveProps.called).toEqual(true);
  });
});