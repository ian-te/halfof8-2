const each = require(`lodash/each`);
const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
const getNodesMap = edges =>
  edges.reduce(
    (acc, current) => (current.node.slug ? [current, ...acc] : acc),
    []
  );

const getPreivousPage = (map, page) => {
  const index = map.findIndex(el => el.node.id === page.id);
  if (index === 0) return map[map.length - 1];
  return map[index - 1];
};
const getNextPage = (map, page) => {
  const index = map.findIndex(el => el.node.id === page.id);
  if (index === map.length - 1) return map[0];
  return map[index + 1];
};

const getFolder = isRootPage => (isRootPage ? "/" : "/project/");


// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  // Only update the `/app` page.
  if (page.path == "/") {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/*";
    // Update the page.
    createPage(page);
  }
};
