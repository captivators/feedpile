import React from 'react';
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import '../../../../__mocks__/localStorageMock';
import {Provider} from 'react-redux';
import store from '../../../store';
import Team from './Team'

test('Landingpage: Team section snapshot test', () => {

  const component = shallow(
    <Team />
    );
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Landingpage: Team section should render four teammate\'s pictures and descriptions', () => {
  const component = render(<Provider store={store}><Team /></Provider>);
  expect(component.find('.team-mate').length).toEqual(4);
  expect(component.find('.teammate-image').length).toEqual(4);
  expect(component.find('.team').length).toEqual(1);
})