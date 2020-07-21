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

export const nameFields = graphql`
  fragment nameFields on nameType {
    id
    name
  }
`

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
            ...nameFields
          },
          inheritedFrom {
            ...nameFields
          }
          parameters {
            ...parametersFields
          }
          typeParameter {
              ...parametersFields
          }
          flags {
            ...flagFields
          }
  }
`

export const parameterFields = graphql`
  fragment parametersFields on parametersField {
    id
    name
    kindString
    flags {
      ...flagFields
    }
    comment {
      ...commentFields
    }
    type {
      ...typeFieldsHelper
    }
    tags {
      ...tagFields
    }
  }
`

export const tagFields = graphql`
  fragment tagFields on tagField {
    tag
    text
  }
`

export const flagFields = graphql`
  fragment flagFields on flagsField {
      isExported,
      isOptional,
      isPrivate,
      isStatic,
      isAbstract,
      isRest
  }`

export const typeFields = graphql`
  fragment typeFields on typeField {
    id
    name
    type
    value
    operator
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
    target {
      ...typeFieldsHelper
    }
    targetType {
      ...typeFieldsHelper
    }
    elements {
      ...typeFieldsHelper
    }
    checkType {
      ...typeFieldsHelper
    }
    extendsType {
      ...typeFieldsHelper
    }
    trueType {
      ...typeFieldsHelper
    }
    falseType {
      ...typeFieldsHelper
    }
  }
`

export const declarationFields = graphql`
  fragment declarationFields on declarationField {
    id
    name
    kindString
    flags {
      ...flagFields
    }
    children {
      ...parametersFields
    }
    signatures {
      name
      kindString
      type{
        ...typeFieldsHelper
      }
      parameters {
       ...parametersFields
      }
    }
    indexSignature {
      name
      kindString
      type{
        ...typeFieldsHelper
      }
      parameters {
       ...parametersFields
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
      ...nameFields
    }
    inheritedFrom {
      ...nameFields
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
      ...typeFields
    },
    extendedBy {
      ...typeFields
    },
    implementedTypes {
      ...typeFields
    }
    implementedBy {
      ...typeFields
    }
    implementationOf {
      ...typeFields
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

  //HELPERS

export const typeFieldsHelper = graphql`
fragment typeFieldsHelper on typeField {
  id
  name
  type
  value
  operator
  checkType {
      ...typeFieldsHelper0
    }
    extendsType {
      ...typeFieldsHelper0
    }
    trueType {
      ...typeFieldsHelper0
    }
    falseType {
      ...typeFieldsHelper0
    }
  targetType {
    ...typeFieldsHelper0
  }
  target {
    ...typeFieldsHelper0
  }
  types {
   ...typeFieldsHelper0
  }
  elements {
    ...typeFieldsHelper0
  }
  elementType {
    ...typeFieldsHelper0
  }
  typeArguments {
   ...typeFieldsHelper0
  }
  declaration {
    id
    name
    kindString
    children {
      name
      kindString
      type {
        ...typeFieldsHelper0
      }
      flags {
        ...flagFields
      }
      comment {
        ...commentFields
      }
    }
    signatures {
      name
      kindString
      type {
        ...typeFieldsHelper0
      }
      parameters {
        flags {
          ...flagFields
        }
        tags {
          ...tagFields
        }
        name
        comment {
          ...commentFields
        }
      }
    }
    indexSignature {
      name
      kindString
      type {
        ...typeFieldsHelper0
      }
      parameters {
        name
        tags {
          ...tagFields
        }
        comment {
          ...commentFields
        }
        type {
          ...typeFieldsHelper0
        }
      }
    }
  }
}
`

export const typeFieldsHelper0 = graphql`
fragment typeFieldsHelper0 on typeField {
  id
  name
  type
  value
  operator
  checkType {
      ...typeFieldsHelper1
    }
    extendsType {
      ...typeFieldsHelper1
    }
    trueType {
      ...typeFieldsHelper1
    }
    falseType {
      ...typeFieldsHelper1
    }
  targetType {
    type
    name
    typeArguments {
      type
      name
      id
    }
  }
  target {
    ...typeFieldsHelper1
  }
  types {
   ...typeFieldsHelper1
  }
  elements {
    ...typeFieldsHelper1
  }
  elementType {
    ...typeFieldsHelper1
  }
  typeArguments {
   ...typeFieldsHelper1
  }
  declaration {
    id
    name
    kindString
    children {
      name
      kindString
      type {
        ...typeFieldsHelper1
      }
      flags {
        ...flagFields
      }
      comment {
        ...commentFields
      }
    }
    signatures {
      name
      kindString
      type {
        ...typeFieldsHelper1
      }
      parameters {
        flags {
          ...flagFields
        }
        tags {
          ...tagFields
        }
        name
        comment {
          ...commentFields
        }
        type {
          ...typeFieldsHelper1
        }
      }
    }
    indexSignature {
      name
      kindString
      type {
        ...typeFieldsHelper1
      }
      parameters {
        name
        tags {
          ...tagFields
        }
        comment {
          ...commentFields
        }
        type {
          ...typeFieldsHelper1
        }
      }
    }
  }
}
`

export const typeFieldsHelper1 = graphql`
  fragment typeFieldsHelper1 on typeField {
    id
    name
    type
    value
    operator
    checkType {
      ...basicTypeFields
    }
    extendsType {
      ...basicTypeFields
    }
    trueType {
      ...basicTypeFields
    }
    falseType {
      ...basicTypeFields
    }
    elements {
      ...basicTypeFields
    }
    types {
      ...basicTypeFields
    }
    elements {
      ...basicTypeFields
    }
    elementType {
      ...basicTypeFields
    }
    typeArguments {
      ...basicTypeFields
      types {
        ...basicTypeFields
      }
    }
    declaration {
      id
      name
      kindString
      children {
      name
      kindString
      type {
        ...basicTypeFields
      }
      flags {
        ...flagFields
      }
      comment {
        ...commentFields
      }
    }
      signatures {
        flags {
          ...flagFields
        }
        name
        kindString
        type {
          ...basicTypeFields
        }
        parameters {
          tags {
            ...tagFields
          }
          comment {
            ...commentFields
          }
          name
          type {
            ...basicTypeFields
          }
        }
      }
      indexSignature {
        name
        kindString
        type {
          ...basicTypeFields
        }
        parameters {
          tags {
            ...tagFields
          }
          comment {
            ...commentFields
          }
          name
          type {
            ...basicTypeFields
          }
        }
      }
    }
  }
`
export const basicTypeFields = graphql`
  fragment basicTypeFields on typeField {
    type
    name
    id
  }
`
