import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import storeConfiguration from '../../src/store/store';
import { Returned } from '../../src/components/Returned.jsx';


describe('<Returned/>', () => {
  // create a spy function for viewUserReturnAction
  const viewUserReturnAction = sinon.spy();
  // spy on componentWillReceiveProps of Profile Page
  sinon.spy(Returned.prototype, 'componentWillMount');
  // spy on componentWillReceiveProps of Profile Page
  sinon.spy(Returned.prototype, 'componentWillReceiveProps');

  const props = {
    bookState: {
      success: true,
      errors: null,
      returnings: ['mmmmmm'],
      pageCount: null
    },
    viewUserReturnAction
  };

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  let store;
  let shallowComponent;
  beforeEach(() => {
    store = mockStore(storeConfiguration);
    shallowComponent = shallow(<Returned {...props} />);
    shallowComponent.setState({
      pageCount: 1,
      returnings: ['mmm'],
    });
  });

  it('renders <Returned /> component', () => {
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });

  it('calls componentWillReceiveProps when paginating', () => {
    props.pageCount = 1;
    props.bookState.pageCount = 2;
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(Returned.prototype.componentWillReceiveProps.called)
      .toEqual(true);
  });

  it('calls componentWillReceiveProps to view returned books', () => {
    props.bookState.success = false;
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(Returned.prototype.componentWillReceiveProps.called).toEqual(true);
  });

  it(`should check if the 'Pagination' is defined`, () => {
    expect(shallowComponent.find('Pagination').length).toBe(1);
    shallowComponent.find('Pagination').simulate('select');
  });
});