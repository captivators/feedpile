import React from 'react';
import ReaderListItem from './ReaderListItem';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json'

test('ReaderListItem snapshot test', () => {
  const article = {
    "title":"Trump Administration Hunts for Easter Eggs, and Senior Staff",
    "publisher":"New York Times",
    "image":"http://oi63.tinypic.com/4sbdpx.jpg",
    "url": "http://www.nytimes.com/video/us/politics/100000005018390/trump-administration-hunts-for-easter-eggs-and-senior-staff.html",
    "description":"The White House is as much as two months behind recent standards for presidential transitions, leaving 90 percent of the positions considered critical to leadership unfilled. It did, however, manage to order the eggs for the Easter egg roll."
  };
  const component = shallow(<ReaderListItem article={article}/>);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});
