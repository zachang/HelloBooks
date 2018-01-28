import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';


import Homepage from '../../src/components/Homepage.jsx';

const shallowWrapper = shallow(<Homepage/>);
const tree = toJson(shallowWrapper);
describe('<Homepage/>', () => {
  it('renders <Homepage/> component', () => {
    expect(tree).toMatchSnapshot();
  });

  it('should check the <HomepageStatement/> component exists', () => {
    expect(shallowWrapper.find('HomepageStatement').length).toBe(1);
  });

  it('should check the <HomepageStatement/> component exists', () => {
    expect(shallowWrapper.find('HomepageStatement').length).toBe(1);
  });
});
