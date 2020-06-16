import { graphql } from "gatsby"

export const commentFields = graphql`
  fragment commentFields on Symbol {
    comment {
      shortText,
      text,
      returns,
      tags {
        tag,
        text
      }
    }
  }`

export const allSignatures = graphql`
  fragment allSignatures on Symbol{
    signatures {
          name,
          kindString,
          comment {
            shortText,
            text
          },
          type {
            type,
            name
          },
          comment {
            shortText,
            text,
            returns,
            tags {
              tag,
              text
            }
          }
          parameters {
            name
            type {
              name
            }
            comment {
              text,
              shortText
            }
          }
        },
        getSignature {
          name,
          kindString,
          comment {
            shortText,
            text,
            returns,
            tags {
              tag,
              text
            }
          }
          type {
            type,
            name
          }
        },
        setSignature {
          name,
          kindString,
          comment {
            shortText,
            text,
            tags {
              tag,
              text
            }
          }
          type {
            type,
            name
          }
          parameters {
            name
            type {
              name
            }
          }
        }
  }`

export const flagField = graphql`
  fragment flagFields on Symbol{
    flags {
        # isExported,
          isOptional,
          isPrivate,
          isStatic
        }
  }`

export const simpleSymbolFields = graphql`
  fragment simpleSymbolFields on Symbol {
    name,
    kindString,
    id,
    defaultValue,
    fields {
      path
      parentPath
    }
    extendedTypes {
      name
    },
    extendedBy {
      name
    },
    implementedTypes {
      name
    }
    implementedBy {
      name
    }
    implementationOf {
      name
    }
    ...allSignatures,
    ...commentFields,
    ...flagFields
  }`

  export const SymbolInterface = graphql`
  interface Symbol {
    name: String!
    kindString: String!
    id: ID!
    fields: [Field]
  }

  interface Field {
    path: String
    parentPath: String
  }
`

//no recursion in graphql
  export const symbolFields = graphql`
  fragment symbolFields on Symbol {
    ...simpleSymbolFields,
    childrenSymbol {
      ...simpleSymbolFields
      childrenSymbol {
        ...simpleSymbolFields
        childrenSymbol {
          ...simpleSymbolFields
          childrenSymbol {
            ...simpleSymbolFields
          }
        }
      }
    }
  }`

  /* getElementByName query:
  export const getElementByName = graphql`
  query getElementByName($name: String!) {
  allSymbol(filter: {name: {eq: $name}}) {
    nodes {
      name
      kindString
      id
      fields {
        path
      }
    }
  }
}
`*/