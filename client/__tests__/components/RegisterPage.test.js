import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import RegisterPage from '../../src/components/auth/RegisterPage.jsx';

describe('<RegisterPage/>', () => {
  const props = {
    showLoginText: false
  };

  const shallowWrapper = shallow(<RegisterPage {...props}/>);
  const tree = toJson(shallowWrapper);

  it('renders <RegisterPage /> component', () => {
    expect(tree).toMatchSnapshot();
  });

  it(`should check if the 'HomepageHeader' is defined`, () => {
    expect(shallowWrapper.find('HomepageHeader').length).toBe(1);
  });

  it(`should check if the 'RegForm' is defined`, () => {
    expect(shallowWrapper.find('Connect(RegForm)').length).toBe(1);
  });
});

