import React from 'react';
import toJson from 'enzyme-to-json';
import { Router, browserHistory } from 'react-router';
import { shallow, mount } from 'enzyme';

import UserBorrow from '../../../src/components/borrow/UserBorrow.jsx';

describe('<UserBorrow/>', () => {
  const props = {
    borrow: {
      Book: {
        bookImage: 'ggv.jpg',
        Category: {
          categoryName: 'xxxx'
        }
      }
    },
    returnBook: () => ''
  };

  const shallowWrapper = shallow(<UserBorrow {...props}/>);
  const tree = toJson(shallowWrapper);
  let wrapper;

  // const wrapperMount = mount(<UserSidebar {...props} />);

  it('renders <UserBorrow /> component', () => {
    expect(tree).toMatchSnapshot();
  });

  it('calls logOut', () => {
    wrapper = shallow(<UserBorrow {...props} />);
    wrapper.find('.red').simulate('click');
    // expect(wrapperMount.find('.logOut').at(0).text()).toBe('Logout');
  });

});

