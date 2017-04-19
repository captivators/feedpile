import React from 'react';
import Sidebar, {Unwrapped as UnwrappedSidebar} from './Sidebar';
import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

test('Sidebar snapshot test', () => {
  const props = {
    open: true,
    dispatchToggle: () => {}
  };
  const component = shallow(<UnwrappedSidebar {...props}/>);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

// test('Sidebar renders SidebarAll', () => {
//   const props = {
//     open: true,
//     dispatchToggle: () => {}
//   };
//   const component = mount(<MuiThemeProvider><UnwrappedSidebar {...props}/></MuiThemeProvider>);
//   expect(component.find('ListItem').length).toEqual(9); //number of ListItem's in Sidebar
// });
