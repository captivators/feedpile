import '../../../__mocks__/localStorageMock'
import React from 'react';
import {Provider} from 'react-redux';
import store from '../../store'
import ReaderList, {Unwrapped as UnwrappedReaderList} from './ReaderList';
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json'
import data from '../../../data.json'

const tempData = {
  "58f7a4b09f861f7da0e08542": [
    {
      "_id": "58f82c8410b7be21d128551c",
      "__v": 0,
      "title": "Cycling to work can cut cancer and heart disease, says study",
      "url": "http://www.bbc.co.uk/news/health-39641122",
      "imageSrc": "http://c.files.bbci.co.uk/16C69/production/_95698239_gettyimages-168396725.jpg",
      "date": "2017-04-20T03:10:41.000Z",
      "datePublished": "2017-04-20T03:10:41.000Z",
      "feedId": "58f7a4b09f861f7da0e08542",
      "summary": "Study of 250,000 UK commuters shows walking is good too but suggests two wheels\nare best.",
      "description": "Study of 250,000 UK commuters shows walking is good too but suggests two wheels are best."
    },
    {
      "_id": "58f82d39e3ad80221d881545",
      "__v": 0,
      "title": "Experts excited by brain 'wonder-drug'",
      "url": "http://www.bbc.co.uk/news/health-39641123",
      "imageSrc": "http://c.files.bbci.co.uk/85F1/production/_95698243_gettyimages-535164801.jpg",
      "date": "2017-04-20T03:05:26.000Z",
      "datePublished": "2017-04-20T03:05:26.000Z",
      "feedId": "58f7a4b09f861f7da0e08542",
      "summary": "A drug for depression could stop all neurodegenerative diseases, including\ndementia, scientists hope.",
      "description": "A drug for depression could stop all neurodegenerative diseases, including dementia, scientists hope."
    }
  ]
}

test('ReaderList take a snapshot', () => {
  const component = shallow(<UnwrappedReaderList fetchArticlesForFeedsFromDb={()=>{}} articles={data}/>);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});
test('ReaderList should render a ReaderListItem for each article', () => {

  const component = render(<Provider store={store}><UnwrappedReaderList fetchArticlesForFeedsFromDb={()=>{}} articles={tempData} currentFeed={""}/></Provider>);
  expect(component.find('.list-item-container').length).toEqual(tempData["58f7a4b09f861f7da0e08542"].length);
});
