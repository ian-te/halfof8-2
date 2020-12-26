import React, { useContext, useReducer, useCallback } from "react";
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

import combineReducers from "react-combine-reducers";

export const ReducerContext = React.createContext();

export const useRootReducer = () => {
  const [reducerCombined, initialStateCombined] = combineReducers({
    player: [playerReducer, initialPlayerState],
    modal: [modalReducer, initialModalState],
    filter: [filterReducer, initialFilterState]
  });
  return useCallback(useReducer(reducerCombined, initialStateCombined), [
    reducerCombined,
    initialStateCombined
  ]);
};
export const useReducerContext = () => useContext(ReducerContext);

export const ReducerProvider = ({ children }) => {
  const [state, dispatch] = useRootReducer();

  return (
    <ReducerContext.Provider value={{ state, dispatch }}>
      {children}
    </ReducerContext.Provider>
  );
};
