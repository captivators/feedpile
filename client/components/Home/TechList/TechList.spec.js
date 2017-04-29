import React from 'react';
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import '../../../../__mocks__/localStorageMock';
import {Provider} from 'react-redux';
import store from '../../../store';
import TechList from './TechList'

test('Landingpage: Team section snapshot test', () => {

  const component = shallow(
      <TechList />
  );
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Landingpage: TechList section should render 15 tech images', () => {
  const component = render(<Provider store={store}><TechList /></Provider>);
  expect(component.find('.stack').length).toEqual(1);
  expect(component.find('.tech-logo').length).toEqual(16);
})