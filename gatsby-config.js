/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
    siteMetadata: {
    title: `LuciadRIA API reference`,
    description: `LuciadRIA API reference`,
    author: `Luciad NV`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tsdoc`,
        path: `${__dirname}/content/docu.json`,
      },
    },
    "gatsby-transformer-json",
    "html-react-parser"
  ],
}
