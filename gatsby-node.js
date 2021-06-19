const each = require(`lodash/each`);
const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const homepageTemplate = path.resolve(`src/templates/index.js`);

  ["en-US", "ja"].forEach((lang) => {
    createPage({
      path: `/${lang}`,
      component: homepageTemplate,
      context: {
        locale: lang,
      },
    });
  });
};

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
