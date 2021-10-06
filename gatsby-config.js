require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_HOST,
  FAVICON_PATH,
  YA_METRIKA_ID,
} = process.env;

module.exports = {
  siteMetadata: {
    title: `halfof8.com`,
    description: ``,
    author: ``,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
        allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
        mergeSecurityHeaders: true, // boolean to turn off the default security headers
        mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
        mergeCachingHeaders: true, // boolean to turn off the default caching headers
        transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
        generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: CONTENTFUL_SPACE_ID,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: CONTENTFUL_ACCESS_TOKEN,
        host: CONTENTFUL_HOST || "cdn.contentful.com",
        downloadLocal: false,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `halfof8`,
        start_url: `/`,
        display: `minimal-ui`,
        icon: FAVICON_PATH || `src/images/h8-favicon-wh.png`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages: [`en-US`, `ja`],
        defaultLanguage: `en-US`,
        // if you are using Helmet, you must include siteUrl, and make sure you add http:https
        siteUrl: `https://halfof8.com/`,
        // you can pass any i18next options
        // pass following options to allow message content as a key
        i18nextOptions: {
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
          keySeparator: false,
          nsSeparator: false,
        },
      },
    },
    {
      resolve: `gatsby-plugin-yandex-metrika`,
      options: {
        // The ID of yandex metrika.
        trackingId: YA_METRIKA_ID || 13731373,
        // Enabled a webvisor. The default value is `false`.
        webvisor: true,
        // Enables tracking a hash in URL. The default value is `false`.
        trackHash: true,
        // Defines where to place the tracking script - `false` means before body (slower loading, more hits)
        // and `true` means after the body (faster loading, less hits). The default value is `false`.
        afterBody: true,
        // Use `defer` attribute of metrika script. If set to `false` - script will be loaded with `async` attribute.
        // Async enables earlier loading of the metrika but it can negatively affect page loading speed. The default value is `false`.
        defer: false,
      },
    },
  ],
};
