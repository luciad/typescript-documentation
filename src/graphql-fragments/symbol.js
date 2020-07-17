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

export const flagFields = graphql`
  fragment flagFields on flagsField {
      isExported,
      isOptional,
      isPrivate,
      isStatic,
      isAbstract
  }`

export const typeFieldsHelper = graphql`
  fragment typeFieldsHelper on typeField {
    id
    name
    type
    types {
      type
      name
      id
    }
    elementType {
      type
      name
      id
    }
    typeArguments {
      type
      name
      id
      types {
        type
        id
        name
      }
    }
    declaration {
      id
      name
      kindString
      signatures {
        name
        kindString
        parameters {
          name
          type {
            name
            type
            id
          }
        }
      }
    }
  }
`

export const typeFields = graphql`
  fragment typeFields on typeField {
    id
    name
    type
    declaration {
      ...declarationFields
    }
    types {
      ...typeFieldsHelper
    }
    elementType {
     ...typeFieldsHelper
    }
    typeArguments {
      ...typeFieldsHelper
    }
  }
`

export const declarationFields = graphql`
  fragment declarationFields on declarationField {
    id
    name
    kindString
    signatures {
      name
      kindString
      parameters {
        name
        type {
          ...typeFieldsHelper
        }
      }
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
    flags {
      ...flagFields
      }
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