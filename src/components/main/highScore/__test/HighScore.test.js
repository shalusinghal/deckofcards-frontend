import React from 'react';
import { createStore } from 'redux';
import renderer from 'react-test-renderer';

import reducers from '../../../../reducers';
import HighScore from '../HighScore';

const store = createStore(reducers);

it('renders correctly when there are no data', () => {
  const tree = renderer.create(<HighScore store={store} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when data is available', () => {
  const highScoreList = [{ name: 'Shalu SInghal', turn: 12 }];
  const tree = renderer.create(<HighScore store={store} highScoreList={highScoreList} />).toJSON();
  expect(tree).toMatchSnapshot();
});
