import '../../../__mocks__/localStorageMock'
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from '../../store';
import { shallow, render, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Navbar from './Navbar'



test('Navbar take a snapshot', () => {
  const component = shallow(<Navbar store={ store }/>);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
}); 

// test('Navbar renders a greeting and an Avatar', () => {
//   // const component = render(<MuiThemeProvider><Navbar store={ store }/></MuiThemeProvider>)
//   // expect(component.find('.greeting').length).toEqual(1)
//
//
//   const component = mount(<MuiThemeProvider><Navbar store={ store }/></MuiThemeProvider>)
//   const element = component.find('.navbar');
//   expect(element.length).toEqual(1);
//
// // Use the Node property of the Wrapped Element to expose the component instance
//   const element2 = component.find(FlatButton);
//   console.log(element2.debug())
//   // const node = ReactDOM.findDOMNode(element2.node)
//   element2.simulate('click');
//
//   expect(element2.state().selected).to.be.true
// })