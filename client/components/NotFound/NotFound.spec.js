import React from 'react';
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import NotFound from './NotFound'

test('NotFound take a snapshot', () => {
  const component = shallow(<NotFound />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});
