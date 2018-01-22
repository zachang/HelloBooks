import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';

import UserReturnedList from '../../../src/components/returns/UserReturnedList.jsx';

describe('<UserReturnedList/>', () => {
  const props = {
    returner: {
      Book: {
        bookName: 'Science',
        borrowDate: new Date(),
        expectedReturn: new Date(),
        actualReturn: 'Science',
        id: 1,
      },
      User: {
        fullname: 'Tito Navo'
      }
    },
    confirmReturn: () => '',
    clickedReturnedBorrowList: []
  };

  const shallowWrapper = shallow(<UserReturnedList {...props}/>);
  const tree = toJson(shallowWrapper);
  let wrapper;

  const wrapperMount = mount(<UserReturnedList {...props} />);

  it('renders <UserReturnedList /> component', () => {
    expect(tree).toMatchSnapshot();
  });

  it('calls onClick', () => {
    wrapper = shallow(<UserReturnedList {...props} />);
    wrapper.find('.btn-small').simulate('click');
    expect(wrapperMount.find('.btn-small').at(0).text()).toBe('Confirm');
  });
});

