import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';

import UserBorrowList from '../../../src/components/borrow/UserBorrowList.jsx';

describe('<UserBorrowList/>', () => {
  const props = {
    borrower: {
      Book: {
        Category: {
          categoryName: 'Science'
        }
      },
      User: {
        fullname: 'Tito Navo'
      }
    },
    confirmBorrow: () => '',
    clickedBorrowList: []
  };

  const shallowWrapper = shallow(<UserBorrowList {...props}/>);
  const tree = toJson(shallowWrapper);
  let wrapper;

  const wrapperMount = mount(<UserBorrowList {...props} />);

  it('renders <UserBorrowList /> component', () => {
    expect(tree).toMatchSnapshot();
  });

  it('calls onClick', () => {
    wrapper = shallow(<UserBorrowList {...props} />);
    wrapper.find('.btn-small').simulate('click');
    expect(wrapperMount.find('.btn-small').at(0).text()).toBe('Confirm');
  });
});

