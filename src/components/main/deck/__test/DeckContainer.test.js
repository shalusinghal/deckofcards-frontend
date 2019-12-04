import React from 'react';
import { createStore } from 'redux';
import renderer from 'react-test-renderer';
import reducers from '../../../../reducers';

import DeckContainer from '../DeckContainer';

const store = createStore(reducers);

it('renders correctly when there are no data', () => {
  const tree = renderer.create(<DeckContainer store={store} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when there is data', () => {
  const decks = [{ deckId: '123', cards: [] }];
  const tree = renderer.create(<DeckContainer store={store} decks={decks} />).toJSON();
  expect(tree).toMatchSnapshot();
});
