import '../../../__mocks__/localStorageMock'
import React from 'react';
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Welcome from './Welcome'
import store from '../../store';
import { Provider } from 'react-redux';

test('Welcome take a snapshot', () => {
  const component = shallow(<Welcome store={ store }/>);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Welcome renders welcome image', () => {
  const component = render(<MuiThemeProvider><Provider store={ store }><Welcome /></Provider></MuiThemeProvider>)
  expect(component.find('.newspaper').length).toEqual(1)
  expect(component.find('.welcome-container').length).toEqual(1)
})