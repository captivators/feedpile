import '../../../__mocks__/localStorageMock'
import { Provider } from 'react-redux';
import React from 'react';
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from '../../store';
import { Unwrapped as UnwrappedDeleteFeed } from './DeleteFeed'

test('DeleteFeed take a snapshot', () => {
  const component = shallow(<UnwrappedDeleteFeed userFeeds={[]}/>);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

// test('DeleteFeed renders modal dialog with checkboxes', () =>{
//   const feeds = [
//     {
//       _id: 'test id',
//       name: 'test name'
//     }
//   ]
//   const component = render(<MuiThemeProvider><UnwrappedDeleteFeed userFeeds={ feeds }/></MuiThemeProvider>)
//   console.log('component', component)
//   expect(component.find('.checkboxes').length).toEqual(1)
// })
