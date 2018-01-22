import React from 'react';
import toJson from 'enzyme-to-json';
import { Router, browserHistory } from 'react-router';
import { shallow } from 'enzyme';

import UserHeader from '../../src/components/common/UserHeader.jsx';

const props = {
  profileImage: '../../src/build/imgs/eben2.jpg',
  profileUsername: 'Ebenezer'
};

const shallowWrapper = shallow(
  <Router history={browserHistory}>
    <UserHeader {...props}/>
  </Router>
);
const tree = toJson(shallowWrapper);
let wrapper;

describe('<UserHeader/>', () => {
  it('renders <UserHeader /> component', () => {
    expect(tree).toMatchSnapshot();
  });

  it('calls logOut', () => {
    wrapper = shallow(<UserHeader {...props} />);
    wrapper.find('.logOut').simulate('click');
  });
});

