import React from 'react';
import {Unwrapped as UnwrappedReadArticle} from './ReadArticle';
import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const article = {
  author: 'victoriawlau',
  date: '2017-04-17T21:04:38.000Z',
  datePublished: '2017-04-17T21:04:38.000Z',
  description: 'Test',
  feedId:'58f4faea29be910cb6467df0',
  imageSrc:'http://tctechcrunch2011.files.wordpress.com/2017/04/3-education-20-20.jpg',
  summary:'We asked the office and the TechCrunch moms on staff for things they’d like for↵Mother’s Day this year. While the unanimous answer to what they wanted was “a↵nap” – they weren’t opposed to receiving these gifts either. Read More',
  title:"12 tech-inspired Mother’s Day gifts",
  url:'http://feedproxy.google.com/~r/Techcrunch/~3/BsZCJrFPZRA/',
  _id:'58f52dfe619dacc31152c9d2'
}

test('ReadArticle take a snapshot', () => {
  const component = shallow(<UnwrappedReadArticle selectedArticle={article}/>);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});
