import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import PageNotFound from '../../src/components/PageNotFound.jsx';

describe('<PageNotFound/>', () => {
  const shallowWrapper = shallow(<PageNotFound/>);
  const tree = toJson(shallowWrapper);


  it('renders <PageNotFound/> component', () => {
    expect(tree).toMatchSnapshot();
  });
});