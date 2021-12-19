import React from "react";
export const PlayerContext = React.createContext();

export const initialState = {
  isPlaying: false,
  currentItem: null,
  tracks: [],
  currentTime: 0,
  duration: 0,
};

export const nextTrackSelector = ({ tracks, currentItem }) => {
  if (!tracks || !tracks[0]) return null;
  if (!currentItem) return tracks[0]?.id;
  const index = tracks?.map((track) => track.id).indexOf(currentItem);
  if (index == tracks.length - 1) return tracks[0].id;
  return tracks[index + 1].id;
};

export const prevTrackSelector = ({ tracks, currentItem }) => {
  if (!tracks || !tracks[0]) return null;
  if (!currentItem) return tracks[0]?.id;
  const index = tracks?.map((track) => track.id).indexOf(currentItem);
  if (index == 0) return tracks[tracks.length - 1].id;
  return tracks[index - 1].id;
};

export const getTrackById = ({ tracks }, id) => {
  return tracks?.find((track) => track.id === id);
};

export const trackProgressSelector = ({ currentTime, duration }) => {
  return currentTime / duration;
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

    case "PLAYPAUSE":
      return {
        ...state,
        isPlaying: !state.isPlaying,
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
        isPlaying: true,
      };

    case "PREV_TRACK":
      return {
        ...state,
        currentItem: prevTrackSelector(state),
        isPlaying: true,
      };

    case "UPDATE_TIME":
      return {
        ...state,
        currentTime: action.data.currentTime,
        duration: action.data.duration,
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
