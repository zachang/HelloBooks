import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';

import HomepageStatement from '../../../src/components/HomepageStatement.jsx';

const props = {
  btnText: false
};

const wrapper = mount(<HomepageStatement/>);
const shallowWrapper = shallow(<HomepageStatement/>);
const tree = toJson(shallowWrapper);
describe('<HomepageStatement/>', () => {
  it('renders <HomepageStatement/> component', () => {
    expect(tree).toMatchSnapshot();
  });

  it(`should check if the div with 'statement' class exist`, () => {
    expect(wrapper.find('.statement').length).toBe(1);
  });

  it(`should check if 'Join us' link exists`, () => {
    expect(wrapper.find('Link').at(0).text()).toBe('Join us');
  });

  it(`should check if 'Login' link exists`, () => {
    expect(wrapper.find('Link').at(1).text()).toBe('Login');
  });

  it(`should check if the h1 with 'orange-text' class exist`, () => {
    expect(wrapper.find('.orange-text').at(0).text()).toBe('Welcome!');
  });
});
