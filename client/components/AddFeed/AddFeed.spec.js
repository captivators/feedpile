import React from 'react';

import '../../../__mocks__/localStorageMock'

import {Unwrapped as UnwrappedAddFeed} from './AddFeed'
import { shallow} from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

test('Header take a snapshot', () => {
  const component = shallow(<UnwrappedAddFeed />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

