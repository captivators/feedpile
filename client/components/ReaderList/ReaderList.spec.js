import React from 'react';
import {Provider} from 'react-redux';
import store from '../../store'
import ReaderList, {Unwrapped as UnwrappedReaderList} from './ReaderList';
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json'
import data from '../../../data.json'
import ReaderListItem from '../ReaderListItem/ReaderListItem'

test('ReaderList take a snapshot', () => {
  const component = shallow(<UnwrappedReaderList articles={data}/>);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});
test('ReaderList should render a ReaderListItem for each article', () => {
  const component = shallow(<UnwrappedReaderList articles={data}/>);
  expect(component.find(ReaderListItem).length).toEqual(data.length);
});
test('ReaderList should render a ReaderListItem for each article with Redux store', () => {
  const component = render(<Provider store={store}><ReaderList articles={data}/></Provider>);
  expect(component.find('.list-item-container').length).toEqual(data.length);
});

