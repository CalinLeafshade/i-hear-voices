import * as types from "./types";

// Player

export const togglePlay = () => ({
  type: types.TOGGLE_PLAY
});

export const playEpisode = episode => ({
  type: types.PLAY_EPISODE,
  episode
});

// Library

export const setPodcasts = podcasts => ({
  type: types.SET_PODCASTS,
  podcasts
});
