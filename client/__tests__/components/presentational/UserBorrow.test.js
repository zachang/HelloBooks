import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';

import UserBorrow from '../../../src/components/borrow/UserBorrow.jsx';

describe('<UserBorrow/>', () => {
  const props = {
    borrow: {
      Book: {
        bookImage: 'ggv.jpg',
        Category: {
          categoryName: 'Arts'
        }
      }
    },
    returnBook: () => ''
  };

  const shallowWrapper = shallow(<UserBorrow {...props}/>);
  const tree = toJson(shallowWrapper);
  let wrapper;

  const wrapperMount = mount(<UserBorrow {...props} />);

  it('renders <UserBorrow /> component', () => {
    expect(tree).toMatchSnapshot();
  });

  it('calls onClick', () => {
    wrapper = shallow(<UserBorrow {...props} />);
    wrapper.find('.red').simulate('click');
    expect(wrapperMount.find('.red').at(0).text()).toBe('Return');
  });
});

