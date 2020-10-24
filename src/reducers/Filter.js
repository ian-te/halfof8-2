import React from "react";
export const FilterContext = React.createContext();

export const initialState = {
  tag: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "FILTER_BY_TAG":
      return {
        ...state,
        tag: action.payload.tag
      };

    case "RESET_FILTER":
      return {
        ...state,
        tag: null
      };

    default:
      return state;
  }
}
