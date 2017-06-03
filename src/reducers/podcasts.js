import * as types from "../actions/types";

const reducer = (
  state = {
    podcasts: []
  },
  action
) => {
  switch (action.type) {
    case types.SET_PODCASTS:
      return {
        ...state,
        podcasts: action.podcasts
      };
    default:
      return state;
  }
};

export default reducer;
