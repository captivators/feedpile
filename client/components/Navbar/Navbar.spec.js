import '../../../__mocks__/localStorageMock'
import React from 'react';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from '../../store';
import { shallow, render, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Navbar from './Navbar'



test('Navbar take a snapshot', () => {
  const component = shallow(<Navbar store={ store } />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Navbar renders a greeting and an Avatar', () => {


  const component = render(<MuiThemeProvider><Navbar store={ store } /></MuiThemeProvider>)
  expect(component.find('.greeting').length).toEqual(1)
  const toggle = component.find('.logout');
  expect(toggle.props().checked).toEqual(true);
  expect(toggle.props().onChange()).toEqual(true);
  //     mount(<MuiThemeProvider><Navbar store={ store } /></MuiThemeProvider>)
  // expect(userProfile.instance()).toEqual(true)
})
