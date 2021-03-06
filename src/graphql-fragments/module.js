import { graphql } from "gatsby"

export const moduleFields = graphql`
  fragment moduleFields on Module {
    name,
    kindString,
    id,
    fields {
      path,
      parentPath
    }
    children {
      ...symbolFields
    }
    groups {
      title
      children
    }
    comment {
      ...commentFields
    }
  }
`
