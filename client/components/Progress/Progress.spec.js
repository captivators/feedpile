import React from 'react';
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Progress from './Progress'

test('Progress take a snapshot', () => {
  const component = shallow(<Progress />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});
