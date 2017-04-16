import React from 'react';
import {Provider} from 'react-redux';
import store from '../../store';
import App from './App'
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

test('App take a snapshot', () => {
  const component = shallow(<App />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('App should render a Sidebar and ReaderList', () => {
  const component = render(<Provider store={store}><App history={{}}/></Provider>);
  expect(component.find('.sidebar-container').length).toEqual(1);
  expect(component.find('.reader-list-container').length).toEqual(1);
});

