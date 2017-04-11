import React from 'react';
import Sidebar from './Sidebar';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json'

test('Sidebar snapshot test', () => {
  // const component = renderer.create(<Sidebar />);
  const component = shallow(<Sidebar />);
  // const tree = component.toJSON();
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});
