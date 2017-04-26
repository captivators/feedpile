import React from 'react';
import Main from './Main'
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import '../../../../__mocks__/localStorageMock'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';
import store from '../../../store'

test('Landingpage: Main section snapshot test', () => {

  const component = shallow(
    <Main />
    );
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Landingpage: Main section should render a background, tagline, and image', () => {
  const component = render(<MuiThemeProvider><Provider store={store}><Main /></Provider></MuiThemeProvider>);
  expect(component.find('.main-container').length).toEqual(1);
  expect(component.find('.tagline').length).toEqual(1);
  expect(component.find('.main-image').length).toEqual(1);
})
