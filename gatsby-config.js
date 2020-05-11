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
    "gatsby-plugin-smoothscroll",
    "html-react-parser",
    "react-use-flexsearch",
    "gatsby-plugin-react-helmet",
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`name`, `path`, `kindString`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type symbol, list how to resolve the fields` values
          Symbol: {
            name: node => node.name,
            path: node => node.fields.path,
            comment: node => JSON.stringify(node.comment),
            // shortText: {
            //   __resolveType(node, context, info){
            //     if(node.comment){
            //       return node.comment.shortText
            //     }
            //     return "";
            //   },
            // },
            // text:{
            //   __resolveType(node, context, info){
            //     if(node.comment){
            //       return node.comment.text
            //     }
            //     return "";
            //   },
            // },
            kindString: node => node.kindString,
          },
        },
        // Optional filter to limit indexed nodes
       /* filter: (node, getNode) =>
          node.frontmatter.tags !== 'exempt',*/
      },
    },
  ],
}
