import React from 'react';
import toJson from 'enzyme-to-json';
import { Router, browserHistory } from 'react-router';
import { shallow, mount } from 'enzyme';

import UserSidebar from '../../src/components/common/UserSidebar.jsx';

const props = {
  profileImage: '../../src/build/imgs/eben2.jpg'
};

const shallowWrapper = shallow(
  <Router history={browserHistory}>
    <UserSidebar {...props}/>
  </Router>
);
const tree = toJson(shallowWrapper);
let wrapper;

const wrapperMount = mount(<UserSidebar {...props} />);

describe('<UserSidebar/>', () => {
  it('renders <UserSidebar /> component', () => {
    expect(tree).toMatchSnapshot();
  });

  it('calls logOut', () => {
    wrapper = shallow(<UserSidebar {...props} />);
    wrapper.find('.logOut').simulate('click');
    expect(wrapperMount.find('.logOut').at(0).text()).toBe('Logout');
  });

  it('should check if the logOut link exists', () => {
    expect(wrapperMount.find('.logOut').at(0).text()).toBe('Logout');
  });
});

