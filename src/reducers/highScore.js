import { ACTION_TYPES } from '../constants';

const highScore = (state = { highScoreList: [] }, action) => {
  if (action.type === ACTION_TYPES.fetchHighScore) {
    return { highScoreList: action.highScoreList };
  }

  return state;
};

export default highScore;
