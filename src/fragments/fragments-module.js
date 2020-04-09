import { graphql } from "gatsby"

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