import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';

import BookCard from '../../../src/components/book/BookCard.jsx';

describe('<BookCard/>', () => {
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
    editBook: jest.fn(),
    deleteBook: jest.fn(),
    readBook: jest.fn()
  };

  const wrapperMount = mount(<BookCard {...props} />);
  const shallowWrapper = shallow(<BookCard {...props}/>);
  const tree = toJson(shallowWrapper);


  it('renders <BookCard/> component', () => {
    expect(tree).toMatchSnapshot();
  });

  it('calls onClick', () => {
    wrapper = shallow(<BookCard {...props} />);
    wrapper.find('.readBook').simulate('click');
    expect(wrapperMount.find('.readBook').at(0).text()).toBe('remove_red_eye');
  });

  it('calls onClick', () => {
    wrapper = shallow(<BookCard {...props} />);
    wrapper.find('.editBook').simulate('click');
    expect(wrapperMount.find('.editBook').at(0).text()).toBe('edit');
  });

  it('calls onClick', () => {
    wrapper = shallow(<BookCard {...props} />);
    wrapper.find('.deleteBook').simulate('click');
    expect(wrapperMount.find('.deleteBook').at(0).text()).toBe('delete');
  });
});

