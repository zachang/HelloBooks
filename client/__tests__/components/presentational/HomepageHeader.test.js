import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { Router, browserHistory } from 'react-router';
import { shallow } from 'enzyme';

import HomepageHeader from '../../../src/components/common/HomepageHeader.jsx';

const props = {
  btnText: false
};

const shallowWrapper = shallow(
  <Router history={browserHistory}>
    <HomepageHeader {...props}/>
  </Router>
);
const tree = toJson(shallowWrapper);
let wrapper;

describe('<HomepageHeader/>', () => {
  it('renders <HomepageHeader /> component', () => {
    expect(tree).toMatchSnapshot();
  });

  it('calls componentDidMount', () => {
    sinon.spy(HomepageHeader.prototype, 'componentDidMount');
    wrapper = shallow(<HomepageHeader {...props} />);
    expect(wrapper.exists()).toBe(true);
    expect(HomepageHeader.prototype.componentDidMount.calledOnce).toEqual(true);
  });
});

