import * as types from "../actions/types";

const reducer = (
  state = {
    playStatus: "stopped",
    episode: null
  },
  action
) => {
  switch (action.type) {
    case types.TOGGLE_PLAY:
      return {
        ...state,
        playStatus: state.playStatus === "playing" ? "paused" : "playing"
      };
    case types.PLAY_EPISODE:
      return {
        ...state,
        playStatus: "playing",
        episode: action.episode
      };
    default:
      return state;
  }
};

export default reducer;
