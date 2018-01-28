import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';

import BookCardUser from '../../../src/components/book/BookCardUser.jsx';

describe('<BookCardUser/>', () => {
  let wrapper;

  const props = {
    book: {
      bookImage: 'ggv.jpg',
      id: 1,
      bookName: 'Harry Potter',
      publishYear: new Date(),
      bookCount: 5,
      description: 'nice read',
      pages: 700,
      Category: {
        categoryName: 'Arts'
      }
    },
    borrowBook: jest.fn(),
    readBook: jest.fn()
  };

  const wrapperMount = mount(<BookCardUser {...props} />);
  const shallowWrapper = shallow(<BookCardUser {...props}/>);
  const tree = toJson(shallowWrapper);


  it('renders <BookCardUser/> component', () => {
    expect(tree).toMatchSnapshot();
  });

  it('calls onClick', () => {
    wrapper = shallow(<BookCardUser {...props} />);
    wrapper.find('.readBook').simulate('click');
    expect(wrapperMount.find('.readBook').at(0).text()).toBe('remove_red_eye');
  });

  it('calls onClick', () => {
    wrapper = shallow(<BookCardUser {...props} />);
    wrapper.find('.borrowBook').simulate('click');
    expect(wrapperMount.find('.borrowBook').at(0).text()).toBe('dlibrary_books');
  });
});

