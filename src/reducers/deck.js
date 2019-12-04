import { ACTION_TYPES, CARD } from '../constants';

const prepareDecks = (action, state) => {
  const { deckIds, totalItems } = action;

  const card = {
    frontSrc: CARD.frontSrc,
    backSrc: CARD.backSrc,
    displayState: 'front',
    alreadyDrawn: false,
  };

  const newDeck = deckIds.map((deckId) => {
    let cards = [];
    // Add the card and code for each deck
    for (let index = 0; index < totalItems; index += 1) {
      cards = [...cards, { ...card, code: `${index}_${deckId}` }];
    }

    return { deckId, cards };
  });

  return {
    ...state,
    decks: newDeck,
    cardDrawCounter: 0,
    match: 0,
    lastOpenCard: null,
  };
};

const changeDisplayStateOfCard = (deck, index) => (
  deck.cards.map((card, counter) => {
    if (counter === index) {
      return { ...card, displayState: (card.displayState === 'front') ? 'back' : 'front' };
    }
    return card;
  })
);

const doToggleCard = (action, state) => {
  const { deckId, index } = action;
  const decks = [...state.decks];
  const newDecks = decks.map((deck) => {
    if (deck.deckId === deckId) {
      // Change the display state
      const cards = changeDisplayStateOfCard(deck, index);
      return { deckId, cards };
    }
    return deck;
  });

  return { ...state, decks: newDecks };
};

const setNewCard = (action, state) => {
  const { deckId, newCard, index } = action.options;
  const decks = [...state.decks];

  const newDecks = decks.map((deck) => {
    if (deck.deckId === deckId) {
      // set the new card to same index and remaiing will be same
      const newDeck = { ...deck };
      const { cards } = newDeck;
      cards[index] = newCard;

      return { deckId, cards: newDeck.cards };
    }
    return deck;
  });

  return { ...state, decks: newDecks };
};

const setLastOpenCard = (action, state) => {
  const { deckId, index } = action.options;

  // return null if last open card is already there
  if (state.lastOpenCard !== null) {
    return { ...state, lastOpenCard: null };
  }

  // Get the selected deck and card and set it as last open card
  const selectedDeck = state.decks.find((deck) => deck.deckId === deckId);
  const newLastOpenCard = selectedDeck.cards.find((card, cardIndex) => cardIndex === index);
  newLastOpenCard.deckId = deckId;
  newLastOpenCard.index = index;

  return { ...state, lastOpenCard: newLastOpenCard };
};

const initialState = {
  decks: [],
  cardDrawCounter: 0,
  match: 0,
  lastOpenCard: null,
};

const deck = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.shuffle:
      return prepareDecks(action, state);
    case ACTION_TYPES.toggleCard:
      return doToggleCard(action, state);
    case ACTION_TYPES.newDraw:
      return setNewCard(action, state);
    case ACTION_TYPES.lastOpenCard:
      return setLastOpenCard(action, state);
    case ACTION_TYPES.cardDrawCounter:
      return { ...state, cardDrawCounter: state.cardDrawCounter + 1 };
    case ACTION_TYPES.cardMatch:
      return { ...state, match: state.match + 1 };
    default:
      return state;
  }
};

export default deck;
