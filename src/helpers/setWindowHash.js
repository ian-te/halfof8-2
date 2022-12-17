export const setWindowHash = (hash) => {
  if (typeof window !== "undefined") {
    window.location.hash = hash;
  }
};
export const getSlideFromHash = (hash) => {
  if (typeof window !== "undefined") {
    const slide = parseInt(hash.replace("#", ""), 10);
    if (Number.isInteger(slide)) {
      return slide;
    }
  }
  return -1;
};

export const removeHash = () => {
  if (typeof window !== "undefined") {
    window.history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search
    );
  }
};
