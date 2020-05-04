import { graphql } from "gatsby"

export const pathQuery = graphql`
  query allPaths {
    allSymbol {
      ...symbolPaths
    }
    allModule {
      ...modulePaths
  }
}
`

export const symbolPaths = graphql`
  fragment symbolPaths on SymbolConnection {
    edges {
        node {
          name
          fields {
            path
          }
        }
      }
  }`

export const modulePaths = graphql`
  fragment modulePaths on ModuleConnection {
    edges {
        node {
          name
          fields {
            path
          }
        }
      }
  }`