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
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'pages',
        engine: 'flexsearch',
        query: `
        {
          allSymbol {
            nodes {
              name
              kindString
              id
              parent {
                ... on Module {
                  name
                }
                ... on Symbol {
                  name
                  parent {
                    ... on Module {
                      name
                    }
                  }
                }
              }
            }
          }
          allModule {
            nodes {
              name
              id
            }
          }
        }        
        `,
        ref: 'id',
        index: ['name', 'kindString'],
        store: ['id', 'path', 'name'],

        normalizer: ({ data }) =>
          data.allSymbol.nodes.map(node => {
            let path = node.name
            let id = node.id
            let name = node.name
            while(node.parent !== undefined && node.parent !== null){
              node = node.parent
              path = node.name + "/" + path
            }
            path = "/module/" + path
            return ({
            id: id,
            path: path,
            name: name,
          })}),
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`name`, `path`, `comment`, `kindString`],
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
