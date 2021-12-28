/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";

function SEO({ description, lang, meta, title: propsTitle }) {
  const { language } = useI18next();
  const { site, allContentfulMeta } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
        allContentfulMeta {
          edges {
            node {
              node_locale
              title
              image {
                file {
                  url
                  fileName
                  contentType
                }
              }
              description {
                childMarkdownRemark {
                  excerpt
                }
              }
            }
          }
        }
      }
    `
  );
  const node = allContentfulMeta.edges.find(
    (edge) => edge.node.node_locale === language
  ).node;
  const title = propsTitle || node.title;

  const metaDescription =
    description || node.description.childMarkdownRemark.excerpt;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`${node.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: node.image.file.url,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;
