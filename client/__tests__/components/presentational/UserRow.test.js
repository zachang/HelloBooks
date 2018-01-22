import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import UserRow from '../../../src/components/user/UserRow.jsx';

describe('<UserRow/>', () => {
  const props = {
    user: {
      fullname: 'Nana Stack',
      username: 'Nandy09',
      phoneNo: '09077777777',
      email: 'Nandy09@gmail.com'
    }
  };

  const shallowWrapper = shallow(<UserRow {...props}/>);
  const tree = toJson(shallowWrapper);


  it('renders <UserRow/> component', () => {
    expect(tree).toMatchSnapshot();
  });
});

