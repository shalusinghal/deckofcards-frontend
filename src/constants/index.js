export const ACTION_TYPES = {
  shuffle: 'SHUFFLE',
  toggleCard: 'TOGGLE_CARD',
  newDraw: 'NEW_DRAW',
  cardDrawCounter: 'CARD_DRAW_COUNTER',
  lastOpenCard: 'LAST_OPEN_CARD',
  cardMatch: 'CARD_MATCH',
  loading: 'LOADING',
  error: 'ERROR',
  fetchHighScore: 'FETCH_HIGH_SCORE',
};

export const CARD = {
  frontSrc: 'https://via.placeholder.com/150?text=Front',
  backSrc: 'https://via.placeholder.com/150?text=Back',
};

export const HIGH_SCORE_URL = 'http://localhost:8000/highscore';
export const DECK_BASE_URL = 'http://localhost:8000/deck';
