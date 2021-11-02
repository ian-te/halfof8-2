import React from "react";
export const PlayerContext = React.createContext();

export const initialState = {
  isPlaying: false,
  currentItem: null,
  tracks: [],
};

const nextTrackSelector = ({ tracks, currentItem }) => {
  if (!currentItem) return tracks[0]?.id;
  const index = tracks.map((track) => track.id).indexOf(currentItem);
  if (index == tracks.length - 1) return tracks[0].id;
  return tracks[index + 1].id;
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "START_PLAYBACK":
      return {
        ...state,
        isPlaying: true,
        currentItem: action.data.currentItem,
      };

    case "STOP_PLAYBACK":
      return {
        ...state,
        isPlaying: false,
        currentItem: null,
      };

    case "FINISH_PLAYBACK":
      return {
        ...state,
        isPlaying: false,
      };

    case "NEXT_TRACK":
      return {
        ...state,
        currentItem: nextTrackSelector(state),
      };

    case "ADD_TRACK":
      return {
        ...state,
        tracks: [...state.tracks, action.data],
      };

    default:
      return state;
  }
}
