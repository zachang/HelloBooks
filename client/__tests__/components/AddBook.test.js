import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import storeConfiguration from '../../src/store/store';
import { AddBook } from '../../src/components/AddBook.jsx';

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

describe('<AddBook/>', () => {
  // create a spy function for addBookAction
  const addBookAction = sinon.spy();
  // create a spy function for getCategoryAction
  const getCategoryAction = sinon.spy();
  // spy on handleFileChange of AddBook Page
  sinon.spy(AddBook.prototype, 'handleFileChange');
  // spy on handleImageChange of AddBook Page
  sinon.spy(AddBook.prototype, 'handleImageChange');
  // spy on handleSubmit of AddBook Page
  sinon.spy(AddBook.prototype, 'handleSubmit');
  // spy on handleChange of AddBook Page
  sinon.spy(AddBook.prototype, 'handleChange');
  // spy on componentWillMount of AddBook Page
  sinon.spy(AddBook.prototype, 'componentWillMount');
  // spy on componentDidUpdate of AddBook Page
  sinon.spy(AddBook.prototype, 'componentDidUpdate');
  // spy on componentWillReceiveProps of AddBook Page
  sinon.spy(AddBook.prototype, 'componentWillReceiveProps');

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
    addBookAction,
    getCategoryAction
  };

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  let store;
  let shallowComponent;
  beforeEach(() => {
    store = mockStore(storeConfiguration);
    shallowComponent = shallow(<AddBook {...props} />);
  });

  it('renders <AddBook /> component', () => {
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });

  it('Should check that addBookAction is called', () => {
    shallowComponent.find('form').simulate('submit', { preventDefault() {} });
    expect(addBookAction.called).toBe(true);
  });

  it('should check that handleSubmit is called', () => {
    shallowComponent.instance().handleSubmit(event);
    expect(AddBook.prototype.handleSubmit.called).toEqual(true);
  });

  it('should check that handleChange is called', () => {
    shallowComponent.instance().handleChange(event);
    expect(AddBook.prototype.handleChange.called).toEqual(true);
  });

  it('should check that handleImageChange is called', () => {
    shallowComponent.setState({
      bookData,
      imagePreviewUrl: 'kkkkkk'
    });
    shallowComponent.instance().handleImageChange(eventImage);
    expect(AddBook.prototype.handleImageChange.called).toEqual(true);
  });

  it('should check that handleImageChange is called', () => {
    shallowComponent.instance().handleFileChange(event);
    expect(AddBook.prototype.handleFileChange.called).toEqual(true);
  });

  it('calls componentWillReceiveProps book created', () => {
    props.bookState.success = true;
    shallowComponent.setState({
      imagePreviewUrl: '',
      categories: props.categoryState.categories,
      showToast
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(AddBook.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('calls componentWillReceiveProps book not created', () => {
    props.bookState.errors = 'Book not created';
    props.bookState.success = false;
    shallowComponent.setState({
      categories: props.categoryState.categories,
      showToast
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(AddBook.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it('calls componentWillReceiveProps book not created', () => {
    props.bookState.errors = 'mmmmmmmmm';
    props.bookState.success = false;
    shallowComponent.setState({
      categories: props.categoryState.categories,
      showToast
    });
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(AddBook.prototype.componentWillReceiveProps.called).toEqual(true);
  });
});