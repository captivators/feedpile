import React from 'react';
import {Provider} from 'react-redux';
import '../../../../__mocks__/localStorageMock'
import store from '../../../store';
import Header, {Unwrapped as UnwrappedHeader} from './Header'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

test('Header take a snapshot', () => {
  const component = shallow(<UnwrappedHeader />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Render Header component', () => {
  const component = mount(<MuiThemeProvider><Provider store={store}><UnwrappedHeader /></Provider></MuiThemeProvider>);
  expect(component.find(AppBar).length).toEqual(1);
});
