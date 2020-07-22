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
    "gatsby-transformer-json",
    "gatsby-plugin-smoothscroll",
    "html-react-parser",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tsdoc`,
        path: `${__dirname}/content/docu.json`,
      },
    },
    { // https://www.gatsbyjs.org/packages/gatsby-source-filesystem/
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/content/media/`,
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`name`, `spacePath`, `path`, `kindString`, `id`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type symbol, list how to resolve the fields` values
          Symbol: {
            name: node => node.name,
            path: node => node.fields.path,
            spacePath: node => node.fields.path.replace(/\//g, " "),
            //comment: node => JSON.stringify(node.comment),
            kindString: node => node.kindString,
            id: node => node.id,
          },
          Module: {
            name: node => node.name,
            path: node => node.fields.path,
            spacePath: node => node.fields.path.replace(/\//g, " "),
            //comment: node => JSON.stringify(node.comment),
            kindString: node => node.kindString,
            id: node=> node.id
          },
        },
        bool: "AND",
        // Optional filter to limit indexed nodes
       /* filter: (node, getNode) =>
          node.frontmatter.tags !== 'exempt',*/
      },
    },
  ],
}
