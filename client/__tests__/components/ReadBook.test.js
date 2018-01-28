import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import storeConfiguration from '../../src/store/store';

import ReadBook from '../../src/components/ReadBook.jsx';


describe('<ReadBook/>', () => {
  // spy on componentWillReceiveProps of ReadBook Page
  sinon.spy(ReadBook.prototype, 'componentWillReceiveProps');

  const props = {
    params: {
      id: 1
    },
    book: {
      success: true,
      book: null
    }
  };

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  let store;
  let mountedComponent;
  beforeEach(() => {
    props.book.success = true;
    store = mockStore(storeConfiguration);
    mountedComponent = mount(<Provider store={store}>
      <ReadBook {...props} />
    </Provider>);
    mountedComponent.setProps({
      book: {
        success: true,
        book: null
      }
    });
  });

  it('renders <ReadBook/> component', () => {
    const tree = toJson(mountedComponent);
    expect(tree).toMatchSnapshot();
  });
});