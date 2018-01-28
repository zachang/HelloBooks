import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import storeConfiguration from '../../src/store/store';
import { App } from '../../src/components/App.jsx';


const categoryData = {
  categoryName: '',
};

describe('<App/>', () => {
  // create a spy function for getOneUserAction
  const getOneUserAction = sinon.spy();
  // spy on componentDidMount of App Component
  sinon.spy(App.prototype, 'componentDidMount');
  // spy on componentWillMount of App Component
  sinon.spy(App.prototype, 'componentWillMount');

  const props = {
    userState: {
      success: true,
      errors: null,
      fails: null,
      user: {
        username: 'mmmmm'
      }
    },
    getOneUserAction
  };

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  let store;
  let shallowComponent;
  beforeEach(() => {
    store = mockStore(storeConfiguration);
    shallowComponent = shallow(<App {...props} />);
  });

  it('renders <App /> component', () => {
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });
});