import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import LoginPage from '../../src/components/auth/LoginPage.jsx';

describe('<LoginPage/>', () => {
  const props = {
    showLoginText: false
  };

  const shallowWrapper = shallow(<LoginPage {...props}/>);
  const tree = toJson(shallowWrapper);

  it('renders <LoginPage /> component', () => {
    expect(tree).toMatchSnapshot();
  });

  it(`should check if the 'HomepageHeader' is defined`, () => {
    expect(shallowWrapper.find('HomepageHeader').length).toBe(1);
  });

  it(`should check if the 'LoginForm' is defined`, () => {
    expect(shallowWrapper.find('Connect(LoginForm)').length).toBe(1);
  });
});

