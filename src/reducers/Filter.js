import { navigate } from "@reach/router";

const getTag = () => {
  if (
    typeof window !== "undefined" &&
    window.location.href.indexOf("/tag/") > -1
  ) {
    const location = window.location.href
      .split("/")
      .filter(part => part !== "");
    return location[location.length - 1];
  }
  return null;
};

export const initialState = {
  tag: getTag()
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
