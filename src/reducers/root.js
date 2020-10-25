import React from "react";
import {
  reducer as playerReducer,
  initialState as initialPlayerState
} from "./Player";

import {
  reducer as modalReducer,
  initialState as initialModalState
} from "./Modal";

import {
  reducer as filterReducer,
  initialState as initialFilterState
} from "./Filter";

export const combineReducers = slices => (prevState, action) =>
  Object.keys(slices).reduce(
    (nextState, nextProp) => ({
      ...nextState,
      [nextProp]: slices[nextProp](prevState[nextProp], action)
    }),
    prevState
  );

export const ReducerContext = React.createContext();

export const useRootReducer = () =>
  React.useReducer(
    combineReducers({
      player: playerReducer,
      modal: modalReducer,
      filter: filterReducer
    }), // here we create the reducer slices
    {
      player: initialPlayerState,
      modal: initialModalState,
      filter: initialFilterState
    }
  );
