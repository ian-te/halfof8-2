const getPath = (path, locale) => {
  if (locale == "en-US") return path;
  return `/${locale}${path}`;
};

module.exports = { getPath };
