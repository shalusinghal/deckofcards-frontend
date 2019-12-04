import { combineReducers } from 'redux';

import highScore from './highScore';
import util from './util';
import deck from './deck';

const gameApp = combineReducers({
  deck,
  highScore,
  util,
});

export default gameApp;
