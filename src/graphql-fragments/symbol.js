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
          overwrites {
            name
          },
          inheritedFrom {
            name
          }
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
            ...typeFieldsParam
            comment {
              text,
              shortText
            }
          }
        },
        getSignature {
          id,
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
          ...typeFieldsSignature
        },
        setSignature {
          id,
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
          ...typeFieldsSignature
          parameters {
            name
            ...typeFieldsParam
          }
        }
  }`

export const flagField = graphql`
  fragment flagFields on Symbol{
    flags {
          isExported,
          isOptional,
          isPrivate,
          isStatic,
          isAbstract
        }
  }`

export const typeFieldsSymbol = graphql`
fragment typeFieldsSymbol on Symbol{
  type {
              id
              name
              type
              types {
                type
                name
              }
              elementType {
                type
                name
              }
            }
}`

export const typeFieldsParam = graphql`
fragment typeFieldsParam on parametersField{
  type {
              id
              name
              type
              types {
                type
                name
              }
              elementType {
                type
                name
              }
            }
}`

export const typeFieldsSignature = graphql`
fragment typeFieldsSignature on signature{
  type {
              id
              name
              type
              types {
                type
                name
              }
              elementType {
                type
                name
              }
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
    overwrites {
      name
    }
    inheritedFrom {
      name
    }
    ...typeFieldsSymbol
    ...links
    ...allSignatures,
    ...commentFields,
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