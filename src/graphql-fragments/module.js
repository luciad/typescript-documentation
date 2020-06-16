import { graphql } from "gatsby"

export const moduleInterface = graphql`
  interface Module {
    name: String!
    kindString: String!
    id: ID!
    fields: [Field]
    ChildrenSymbol: [Symbol]
  }

  interface Field {
    path: String
    parentPath: String
  }
`

export const moduleFields = graphql`
  fragment moduleFields on Module {
    name,
    kindString,
    id,
    fields {
      path,
      parentPath
    }
    childrenSymbol {
      ...symbolFields
    }
  }
`
