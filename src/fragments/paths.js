import { graphql } from "gatsby"

export const pathQuery = graphql`
  query pathQuery {
    allSymbol {
      edges {
        node {
          name
          fields {
            path
          }
        }
      }
    }
    allModule {
      edges {
        node {
          fields {
            path
          }
          name
        }
      }
    }
  }
`


