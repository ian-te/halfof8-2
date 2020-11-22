import React from "react";
import { navigate } from "@reach/router";

export const initialState = {
  tag: null
};

export function reducer(state = initialState, action) {
  console.log(">>>", action);
  switch (action.type) {
    case "FILTER_BY_TAG":
      console.log(">>> filter by tag");
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
      console.log(">>> filter by tag");
      navigate(`/`);
      return {
        ...state,
        tag: null
      };

    default:
      return state;
  }
}
