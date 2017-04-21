import React from 'react';
import FeatureList from './FeatureList'
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

test('Landingpage: Feature list snapshot test', () => {

  const component = shallow(
    <FeatureList />
    );
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});