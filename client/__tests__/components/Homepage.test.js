import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import Homepage from '../../src/components/Homepage.jsx';


configure({ adapter: new Adapter() });

const shallowWrapper = shallow(<Homepage/>);
const tree = toJson(shallowWrapper);
describe('<Homepage/>', () => {
  it('renders <Homepage/> component', () => {
    expect(tree).toMatchSnapshot();
  });
});
