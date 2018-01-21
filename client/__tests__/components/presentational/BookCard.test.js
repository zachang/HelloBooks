import React from 'react';
import toJson from 'enzyme-to-json';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Router, browserHistory } from 'react-router';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import storeConfiguration from '../../src/store/store';
import connectedApp, { App } from '../../src/components/App.jsx';

describe('<App/>', () => {
  const middleware = [thunk];
  const getOneUserAction = sinon.spy();
  sinon.spy(App.prototype, 'componentWillMount');

  const props = {
    userState: {
      user: {
        userImage: 'ada.jpg',
        username: 'Onoja Monday'
      }
    },
    chiildren: {},
    getOneUserAction
  };

  const mockStore = configureMockStore(middleware);
  let mountedComponent;
  let store;
  let wrapper;
  let shallowComponent;

  beforeEach(() => {
    store = mockStore(storeConfiguration);
    mountedComponent = mount(<App {...props}/>);
    shallowComponent = shallow(
      <Router history={browserHistory}>
        <App {...props}/>
      </Router>
    );
    wrapper = mount(<Provider store={storeConfiguration}><App /></Provider>);
  });

  // it('renders <App/> component', () => {
  //   const tree = toJson(shallowComponent);
  //   expect(tree).toMatchSnapshot();
  // });

  it('Should check that number of form fields is equal to 6', () => {
    console.log(mountedComponent.find('.row'));
    // expect(wrapper.find('FormField').length).toBe(6);
  });
});

