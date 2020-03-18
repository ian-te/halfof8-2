const each = require(`lodash/each`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
const getNodesMap = edges =>
  edges
    .reduce((acc, current) => (current.node.slug ? [current, ...acc] : acc), [])
    .sort((a, b) => a.node.order - b.node.order)

const getPreivousPage = (map, page) => {
  const index = map.findIndex(el => el.node.id === page.id)
  if (index === 0) return map[map.length - 1]
  return map[index - 1]
}
const getNextPage = (map, page) => {
  const index = map.findIndex(el => el.node.id === page.id)
  if (index === map.length - 1) return map[0]
  return map[index + 1]
}

const getFolder = isRootPage => (isRootPage ? "/" : "/project/")

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against the local Contentful graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.
    graphql(
      `
        {
          allContentfulPortfolioItem(
            limit: 1000
            sort: { order: ASC, fields: [order] }
          ) {
            edges {
              node {
                id
                slug
                backgroundColor
                textColor
                order
                isRootPage
              }
            }
          }
        }
      `
    ).then(result => {
      if (result.errors) {
        reject(result.errors)
      }

      // Create Product pages
      const productTemplate = path.resolve(`./src/layouts/inner.js`)
      // We want to create a detailed page for each
      // product node. We'll just use the Contentful id for the slug.
      let prev = null
      let next = null
      each(result.data.allContentfulPortfolioItem.edges, (edge, key) => {
        // Gatsby uses Redux to manage its internal state.
        // Plugins and sites can use functions like "createPage"
        // to interact with Gatsby.
        const { id, backgroundColor, textColor, slug } = edge.node
        const map = getNodesMap(result.data.allContentfulPortfolioItem.edges)
        const prev = getPreivousPage(map, { id, slug })
        const next = getNextPage(map, { id, slug })
        const isRootPage = edge.node.isRootPage
        createPage({
          // Each page is required to have a `path` as well
          // as a template component. The `context` is
          // optional but is often necessary so the template
          // can query data specific to each page.
          path: `${getFolder(isRootPage)}${
            edge.node.slug ? edge.node.slug : edge.node.id
          }/`,
          component: slash(productTemplate),
          layout: "empty",
          context: {
            id,
            backgroundColor,
            textColor,
            prev,
            next,
          },
        })
      })
      resolve()
    })
  })
}
