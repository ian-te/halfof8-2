export const initialState = {
  isOpen: false,
  currentSlide: -1,
  totalSlides: 0,
};

const prevSlideSelector = ({ currentSlide, totalSlides }) => {
  if (currentSlide === 0) return totalSlides - 1;
  return currentSlide - 1;
};

const nextSlideSelector = ({ currentSlide, totalSlides }) => {
  if (currentSlide === totalSlides - 1) return 0;
  return currentSlide + 1;
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "INIT_MODAL":
      return {
        ...state,
        totalSlides: action.data.totalSlides,
      };
    case "OPEN_MODAL":
      return {
        ...state,
        isOpen: true,
        currentSlide: action.data.slide,
      };

    case "NEXT_SLIDE":
      return {
        ...state,
        currentSlide: nextSlideSelector(state),
      };

    case "PREV_SLIDE":
      return {
        ...state,
        currentSlide: prevSlideSelector(state),
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
