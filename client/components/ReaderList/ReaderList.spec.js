import '../../../__mocks__/localStorageMock'
import React from 'react';
import {Provider} from 'react-redux';
import store from '../../store'
import ReaderList, {Unwrapped as UnwrappedReaderList} from './ReaderList';
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json'
import data from '../../../data.json'

test('ReaderList take a snapshot', () => {
  const component = shallow(<UnwrappedReaderList articles={data}/>);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});
test('ReaderList should render a ReaderListItem for each article', () => {
  const component = render(<Provider store={store}><UnwrappedReaderList articles={data}/></Provider>);
  expect(component.find('.list-item-container').length).toEqual(data.length);
});
