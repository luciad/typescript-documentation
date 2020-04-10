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
  ],
}
