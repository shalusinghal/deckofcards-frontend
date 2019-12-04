import { ACTION_TYPES } from '../constants';

export const shuffle = ({ deckIds, totalItems }) => ({
  deckIds,
  totalItems,
  type: ACTION_TYPES.shuffle,
});

export const toggleCard = ({ deckId, index }) => ({
  deckId,
  index,
  type: ACTION_TYPES.toggleCard,
});

export const newDraw = (options) => ({
  options,
  type: ACTION_TYPES.newDraw,
});

export const setCardDrawCounter = () => ({
  type: ACTION_TYPES.cardDrawCounter,
});

export const setLastOpenCard = (options) => ({
  options,
  type: ACTION_TYPES.lastOpenCard,
});

export const setCardMatch = () => ({
  type: ACTION_TYPES.cardMatch,
});

export const toggeLoading = () => ({
  type: ACTION_TYPES.loading,
});

export const setError = (errorFlag) => ({
  errorFlag,
  type: ACTION_TYPES.error,
});

export const fetchHighScore = (highScoreList) => ({
  highScoreList,
  type: ACTION_TYPES.fetchHighScore,
});
