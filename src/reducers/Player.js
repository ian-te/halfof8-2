import React from "react";
export const PlayerContext = React.createContext();

export const initialState = {
  isPlaying: false,
  currentItem: null
};

export function reducer(state = initialState, action) {
  console.log(">>", state, action);
  switch (action.type) {
    case "START_PLAYBACK":
      return {
        ...state,
        isPlaying: true,
        currentItem: action.data.currentItem
      };

    case "STOP_PLAYBACK":
      console.log(">>", "stopped playback");
      return {
        ...state,
        isPlaying: false
      };

    default:
      return state;
  }
}
