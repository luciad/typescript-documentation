import { graphql } from "gatsby"

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