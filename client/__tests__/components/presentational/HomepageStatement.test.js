import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { Router, browserHistory } from 'react-router';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import HomepageStatement from '../../../src/components/HomepageStatement.jsx';


configure({ adapter: new Adapter() });

const props = {
  btnText: false
};

const wrapper = mount(<HomepageStatement/>);
// const tree = toJson(shallowWrapper);
describe('<HomepageStatement/>', () => {
  it(`should check if the div with 'statement' class exist`, () => {
    expect(wrapper.find('.statement').length).toBe(1);
  });
});
