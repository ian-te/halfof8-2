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

  const result = await graphql(`
    {
      allContentfulTag {
        nodes {
          id
          name
          node_locale
          identifier
        }
      }
    }
  `);
  const {
    allContentfulTag: { nodes: tags },
  } = result.data;

  tags.forEach((tag) => {
    createPage({
      path: getPath(`/tag/${tag.identifier}`, tag.node_locale),
      component: homepageTemplate,
      context: {
        tag: tag.identifier,
        locale: tag.node_locale,
      },
    });
  });

  createPage({
    path: "/",
    component: homepageTemplate,
    context: {
      tag: null,
    },
  });
};

// // Implement the Gatsby API “onCreatePage”. This is
// // called after every page is created.
// exports.onCreatePage = async ({ page, actions }) => {
//   const { createPage } = actions;
//   // Only update the `/app` page.
//   if (page.path == "/") {
//     // page.matchPath is a special key that's used for matching pages
//     // with corresponding routes only on the client.
//     page.matchPath = "/*";
//     // Update the page.
//     createPage(page);
//   }
// };

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

    type ContentfulTextSnippet implements Node {
      externalUrl: String
    }

    type ContentfulWidget implements Node{
      name: String
      embedUrl: String
      tags: [ContentfulTag] @link(from: "tags___NODE")
    }

    type ContentfulAudio implements Node{
      waveformImage: ContentfulAsset @link(from: "waveformImage___NODE")
      background: ContentfulAsset @link(from: "background___NODE")
      tags: [ContentfulTag] @link(from: "tags___NODE")
    }

  `);
};
