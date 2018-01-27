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
    bookName: 'Charli Chapman',
    author: 'Creg Gadner',
    bookCount: 1,
    categoryId: 1,
    publishYear: new Date(),
    isbn: '#1000789',
    pages: 7000,
    description: 'mmmmmmm',
    bookImage: 'mmmm.jpg',
    bookImage_text: 'mmmmmm',
    bookContent: 'kkkkk.pdf',
    bookContent_text: 'mmmmm'
  }
};

describe('<AddBook/>', () => {
  // create a spy function for addBookAction
  const addBookAction = sinon.spy();
  // create a spy function for getCategoryAction
  const getCategoryAction = sinon.spy();
  // spy on handleSubmit of Signup Page
  sinon.spy(AddBook.prototype, 'handleSubmit');
  // spy on handleChange of Signup Page
  sinon.spy(AddBook.prototype, 'handleChange');
  // spy on componentWillMount of Signup Page
  sinon.spy(AddBook.prototype, 'componentWillMount');
  // spy on componentWillReceiveProps of Signup Page
  sinon.spy(AddBook.prototype, 'componentWillReceiveProps');

  const props = {
    bookState: {
      success: null,
      errors: null,
      passes: null
    },
    categoryState: {
      success: null,
      errors: null,
      fails: null
    },
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
});