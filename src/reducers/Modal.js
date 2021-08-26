export const initialState = {
  isOpen: false,
  currentSlide: -1,
};

export function reducer(state = initialState, action) {
  console.log(">>>", state);
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        isOpen: true,
        currentSlide: action.data.slide,
      };

    case "NEXT_SLIDE":
      return {
        ...state,
        currentSlide: state.currentSlide + 1,
      };

    case "PREV_SLIDE":
      return {
        ...state,
        currentSlide: state.currentSlide - 1,
      };

    case "CLOSE_MODAL":
      return {
        ...state,
        isOpen: false,
      };

    default:
      return state;
  }
}
