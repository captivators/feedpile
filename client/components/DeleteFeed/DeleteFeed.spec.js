import '../../../__mocks__/localStorageMock'
import { Provider } from 'react-redux';
import React from 'react';
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from '../../store';
import { Unwrapped as UnwrappedDeleteFeed } from './DeleteFeed'
import getMuiTheme from '../../../node_modules/material-ui/styles/getMuiTheme';



test('DeleteFeed take a snapshot', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
  const component = shallowWithContext(<UnwrappedDeleteFeed userFeeds={[]} store={ store }/>);
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
//
//
//   const component = render(<MuiThemeProvider><UnwrappedDeleteFeed open={true} store={ store }
//                                                                    openDeleteFeedModal={false}
//                                                                   userFeeds={feeds}/></MuiThemeProvider>);
//   expect(component.find('Dialog').hasClass('.checkboxes')).toBe(true)
// })