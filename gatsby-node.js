const each = require(`lodash/each`);
const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);
const { getPath } = require("./src/helpers/locale");

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const homepageTemplate = path.resolve(`src/templates/index.js`);

  ["en-US"].forEach((lang) => {
    createPage({
      path: getPath("/", lang),
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

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    union ContentfulMainPageItems = ContentfulPortfolioItem | ContentfulWidget | ContentfulAudio | ContentfulTextSnippet

    # Replace MyContentfulEntryType below with your actual type name having a link field
    type ContentfulMainPage implements Node {
      items: [ContentfulMainPageItems] @link(from: "items___NODE")
    }

    union ContentfulMenuItems = ContentfulTextSnippet | ContentfulTag

    type ContentfulMenu {
      rightItems: [ContentfulMenuItems] @link(from: "rightItems___NODE")
      leftItems: [ContentfulMenuItems] @link(from: "leftItems___NODE")
    }

    type ContentfulPortfolioItem implements Node {
      externalLinks: [String]
      externalUrl: String
    }

    type ContentfulWidget {
      name: String
      embedUrl: String
      tags: [ContentfulTag]
    }

    type ContentfulAudio {
      waveformImage: ContentfulAsset
      background: ContentfulAsset
      tags: [ContentfulTag]
    }

  `);
};
