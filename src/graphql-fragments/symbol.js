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
          isExported,
          isOptional,
          isPrivate,
          isStatic,
          isAbstract
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
    ...links
    ...allSignatures,
    ...commentFields,
    ...flagFields
  }`

export const links = graphql`
  fragment links on Symbol {
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