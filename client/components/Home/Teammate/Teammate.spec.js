import React from 'react';
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Teammate from './Teammate'

test('Landingpage: Teammate take a snapshot', () => {
  const teammate= {
    info : {
      name: 'Faiz Mohammad',
      job: 'Software Engineer',
      image: 'https://s15.postimg.org/mnsiyo6ob/19718788.png'
    }
  }

  const component = shallow(
      <Teammate info={ teammate } />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});