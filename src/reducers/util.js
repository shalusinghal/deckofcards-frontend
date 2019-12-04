import { ACTION_TYPES } from '../constants';

const util = (state = { loading: false, isError: false }, action) => {
  switch (action.type) {
    case ACTION_TYPES.loading:
      return { ...state, loading: !state.loading };
    case ACTION_TYPES.error:
      return { ...state, isError: action.errorFlag };
    default:
      return state;
  }
};

export default util;
