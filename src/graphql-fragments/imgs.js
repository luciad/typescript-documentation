import { graphql } from "gatsby"
export const allImgs = graphql`
  query allImgs {
    allFile(filter: {extension: {ne: "json"}}) {
    edges {
      node {
        relativePath
        publicURL
      }
    }
  }
}
`