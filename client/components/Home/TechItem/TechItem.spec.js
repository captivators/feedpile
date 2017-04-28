import React from 'react';
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import TechItem from './TechItem'

test('Landingpage: TechItem take a snapshot', () => {
  const techItem = {
    name: "React",
    link: "https://facebook.github.io/react/",
    image: "https://s27.postimg.org/ud14uv8v7/logo-578x270.png"
  }

  const component = shallow(
      <TechItem tech={ techItem } />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});