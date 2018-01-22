import React from 'react';
import toJson from 'enzyme-to-json';
import { Router, browserHistory } from 'react-router';
import { shallow } from 'enzyme';

import AdminHeader from '../../src/components/common/AdminHeader.jsx';

const props = {
  profileImage: '../../src/build/imgs/eben2.jpg',
  profileUsername: 'Ebenezer'
};

const shallowWrapper = shallow(
  <Router history={browserHistory}>
    <AdminHeader {...props}/>
  </Router>
);
const tree = toJson(shallowWrapper);
let wrapper;

describe('<AdminHeader/>', () => {
  it('renders <AdminHeader /> component', () => {
    expect(tree).toMatchSnapshot();
  });

  it('calls logOut', () => {
    wrapper = shallow(<AdminHeader {...props} />);
    wrapper.find('.logOut').simulate('click');
  });
});

