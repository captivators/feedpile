import React from 'react';
import Home from './Home'
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

test('Homepage snapshot test', () => {

  const component = shallow(
    <Home />
    );
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});