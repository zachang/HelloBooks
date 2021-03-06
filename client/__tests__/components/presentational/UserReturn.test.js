import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import UserReturn from '../../../src/components/return/UserReturn.jsx';

describe('<UserReturn/>', () => {
  const props = {
    returning: {
      Book: {
        bookImage: '../../imgs/default.jpg' || null,
        bookName: 'Science',
        bookCount: 4,
        pages: 600,
        description: 'fine',
        publishYear: new Date(),
        id: 1,
        Category: {
          categoryName: 'Arts'
        }
      }
    }
  };

  const shallowWrapper = shallow(<UserReturn {...props}/>);
  const tree = toJson(shallowWrapper);


  it('renders <UserReturn/> component', () => {
    expect(tree).toMatchSnapshot();
  });
});

