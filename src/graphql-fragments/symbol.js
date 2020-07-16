import { graphql } from "gatsby"

export const commentFields = graphql`
  fragment commentFields on commentField {
    shortText,
    text,
    returns,
    tags {
      tag,
      text
    }
  }`

export const allSignatures = graphql`
  fragment allSignatures on Symbol {
    signatures {
         ...signatureFields
        },
        getSignature {
          ...signatureFields
        },
        setSignature {
          ...signatureFields
        }
  }`

export const signatureFields = graphql`
  fragment signatureFields on signature {
          name
          kindString
          comment {
            ...commentFields
          }
          type {
            ...typeFields
          }
          overwrites {
            id
            name
          },
          inheritedFrom {
            name
          }
          parameters {
            name
            type {
              ...typeFields
            }
            comment {
              ...commentFields
            }
          }
  }
`

export const flagField = graphql`
  fragment flagFields on Symbol {
    flags {
          isExported,
          isOptional,
          isPrivate,
          isStatic,
          isAbstract
        }
  }`

export const typeFieldsHelper = graphql`
  fragment typeFieldsHelper on typeField {
    id
    name
    type
    types {
      type
      name
    }
  }
`

export const typeFields = graphql`
  fragment typeFields on typeField {
    id
    name
    type
    types {
      ...typeFieldsHelper
    }
    elementType {
     ...typeFieldsHelper
    }
  }
`

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
    overwrites {
      id
      name
    }
    inheritedFrom {
      name
    }
    type {
      ...typeFields
    }
    ...links
    ...allSignatures,
    comment {
      ...commentFields,
    }
    ...flagFields
  }`

export const links = graphql`
  fragment links on Symbol {
    extendedTypes {
      type
      id
      name
    },
    extendedBy {
      type
      id
      name
    },
    implementedTypes {
      type
      id
      name
    }
    implementedBy {
      type
      id
      name
    }
    implementationOf {
      type
      id
      name
    }
  }`

//no recursion in graphql
  export const symbolFields = graphql`
  fragment symbolFields on Symbol {
    ...simpleSymbolFields,
    children {
      ...simpleSymbolFields
      children {
        ...simpleSymbolFields
        children {
          ...simpleSymbolFields
          children {
            ...simpleSymbolFields
          }
        }
      }
    }
  }`