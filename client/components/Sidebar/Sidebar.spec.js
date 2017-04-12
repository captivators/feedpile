import React from 'react';
import Sidebar from './Sidebar';
import SidebarAll from '../SidebarAll/SidebarAll'
import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json'

test('Sidebar snapshot test', () => {
  const component = shallow(<Sidebar />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});
test('Sidebar renders SidebarAll', () => {
  const component = shallow(<Sidebar />);
  expect(component.find(SidebarAll).length).toEqual(1);
});
