import React from 'react';
import toJson from 'enzyme-to-json';
import { Router, browserHistory } from 'react-router';
import { shallow, mount } from 'enzyme';

import AdminSidebar from '../../src/components/common/AdminSidebar.jsx';

const props = {
  profileImage: '../../src/build/imgs/eben2.jpg'
};

const shallowWrapper = shallow(
  <Router history={browserHistory}>
    <AdminSidebar {...props}/>
  </Router>
);
const tree = toJson(shallowWrapper);
let wrapper;

const wrapperMount = mount(<AdminSidebar {...props} />);

describe('<AdminSidebar/>', () => {
  it('renders <AdminSidebar /> component', () => {
    expect(tree).toMatchSnapshot();
  });

  it('calls logOut', () => {
    wrapper = shallow(<AdminSidebar {...props} />);
    wrapper.find('.logOut').simulate('click');
    expect(wrapperMount.find('.logOut').at(0).text()).toBe('Logout');
  });

  it('should check if the logOut link exists', () => {
    expect(wrapperMount.find('.logOut').at(0).text()).toBe('Logout');
  });
});

