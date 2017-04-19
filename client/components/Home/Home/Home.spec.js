import '../../../../__mocks__/localStorageMock'
import React from 'react';
import Home from './Home'
import {Provider} from 'react-redux';
import store from '../../../store'
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

test('Homepage snapshot test', () => {

  const component = shallow(
    <Home />
    );
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test ('Homepage should render teammate info, featurelist, and techlist components', () => {
  const component = render(<Provider store={store}><Home /></Provider>);
  expect(component.find('.features').length).toEqual(1);
  expect(component.find('.feature-item').length).toEqual(3);
  expect(component.find('.team').length).toEqual(1);
  expect(component.find('.team-mate').length).toEqual(4);
  expect(component.find('.tech-logo').length).toEqual(15);
})