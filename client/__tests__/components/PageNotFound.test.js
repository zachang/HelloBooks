import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';

import PageNotFound from '../../src/components/PageNotFound.jsx';


describe('<PageNotFound/>', () => {
  let shallowComponent;
  beforeEach(() => {
    shallowComponent = shallow(<PageNotFound/>);
  });

  it('renders <PageNotFound/> component', () => {
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });
});