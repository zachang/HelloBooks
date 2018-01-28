import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import Unauthorized from '../../src/components/Unauthorized.jsx';

describe('<Unauthorized/>', () => {
  const shallowWrapper = shallow(<Unauthorized/>);
  const tree = toJson(shallowWrapper);


  it('renders <Unauthorized/> component', () => {
    expect(tree).toMatchSnapshot();
  });
});