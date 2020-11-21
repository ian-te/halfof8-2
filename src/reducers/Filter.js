import React from "react";
import { navigate } from "@reach/router";

export const FilterContext = React.createContext();

export const initialState = {
  tag: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "FILTER_BY_TAG":
      if (action.payload.tag === state.tag) {
        navigate(`/`);
        return {
          ...state,
          tag: null
        };
      }
      navigate(`/tag/${action.payload.tag}`);
      return {
        ...state,
        tag: action.payload.tag
      };

    case "RESET_FILTER":
      navigate(`/`);
      return {
        ...state,
        tag: null
      };

    default:
      return state;
  }
}
