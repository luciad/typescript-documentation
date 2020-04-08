import { graphql } from "gatsby"

export const commentFields = graphql`
  fragment commentFields on Symbol {
    comment {
      shortText,
      text,
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
          },
          type {
            type,
            name
          },
          comment {
              shortText
          }
        },
        getSignature {
          name,
          kindString,
          comment {
            shortText,
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

export const symbolFields = graphql`
  fragment symbolFields on Symbol {
    name,
    kindString,
    id,
    ...allSignatures,
    ...commentFields,
    ...flagFields
  }`

export const moduleFields = graphql`
  fragment moduleFields on Module {
    name,
    kindString,
    id,
    ...moduleFlagFields
  }
`

export const moduleFlagField = graphql`  
  fragment moduleFlagFields on Module{
    flags {
        # isExported,
          isOptional,
          isPrivate,
          isStatic
        }
  }`