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
            ...typeFields
          },
          inheritedFrom {
            ...typeFields
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
    defaultValue
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
      hasExportAssignment
      isAbstract
      isConst
      isConstructorProperty
      isExported
      isOptional
      isLet
      isPrivate
      isProtected
      isPublic
      isReadonly
      isRest
      isStatic
  }`

export const typeFields = graphql`
  fragment typeFields on typeField {
      checkType {
        ...typeFieldsHelper
      }
    comment {
      ...commentFields
    }
    constraint {
      ...typeFieldsHelper
    }
    declaration {
      ...declarationFields
    }
    elementType {
     ...typeFieldsHelper
    }
    elements {
      ...typeFieldsHelper
    }
    extendsType {
      ...typeFieldsHelper
    }
    falseType {
      ...typeFieldsHelper
    }
    id
    indexType {
      ...typeFieldsHelper
    }
    name
    objectType {
      ...typeFieldsHelper
    }
    operator
    queryType {
      ...typeFieldsHelper
    }
    target {
      ...typeFieldsHelper
    }
    targetType {
      ...typeFieldsHelper
    }
    trueType {
      ...typeFieldsHelper
    }
    type
    typeArguments {
      ...typeFieldsHelper
    }
    types {
      ...typeFieldsHelper
    }
    value
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
      ...typeFields
    }
    inheritedFrom {
      ...typeFields
    }
    type {
      ...typeFields
    }
    typeParameter {
      ...parametersFields
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
      checkType {
        ...typeFieldsHelper0
      }
    comment {
      ...commentFields
    }
    constraint {
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
        defaultValue
        type {
          ...typeFieldsHelper0
        }
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
        defaultValue
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
    elementType {
     ...typeFieldsHelper0
    }
    elements {
      ...typeFieldsHelper0
    }
    extendsType {
      ...typeFieldsHelper0
    }
    falseType {
      ...typeFieldsHelper0
    }
    id
    indexType {
      ...typeFieldsHelper0
    }
    name
    objectType {
      ...typeFieldsHelper0
    }
    operator
    queryType {
      ...typeFieldsHelper0
    }
    target {
      ...typeFieldsHelper0
    }
    targetType {
      ...typeFieldsHelper0
    }
    trueType {
      ...typeFieldsHelper0
    }
    type
    typeArguments {
      ...typeFieldsHelper0
    }
    types {
      ...typeFieldsHelper0
    }
    value
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
    ...typeFieldsHelper1
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
        defaultValue
        flags {
          ...flagFields
        }
        tags {
          ...tagFields
        }
        name
        type {
          ...typeFieldsHelper1
        }
        comment {
          ...commentFields
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
        defaultValue
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
      ...typeFieldsHelper2
    }
    extendsType {
      ...typeFieldsHelper2
    }
    trueType {
      ...typeFieldsHelper2
    }
    falseType {
      ...typeFieldsHelper2
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
    ...typeFieldsHelper2
  }
  types {
   ...typeFieldsHelper2
  }
  elements {
    ...typeFieldsHelper2
  }
  elementType {
    ...typeFieldsHelper2
  }
  typeArguments {
   ...typeFieldsHelper2
  }
  declaration {
    id
    name
    kindString
    children {
      name
      kindString
      type {
        ...typeFieldsHelper2
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
        ...typeFieldsHelper2
      }
      parameters {
        defaultValue
        flags {
          ...flagFields
        }
        tags {
          ...tagFields
        }
        name
        type {
          ...typeFieldsHelper2
        }
        comment {
          ...commentFields
        }
        type {
          ...typeFieldsHelper2
        }
      }
    }
    indexSignature {
      name
      kindString
      type {
        ...typeFieldsHelper2
      }
      parameters {
        defaultValue
        name
        tags {
          ...tagFields
        }
        comment {
          ...commentFields
        }
        type {
          ...typeFieldsHelper2
        }
      }
    }
  }
}
`

export const typeFieldsHelper2 = graphql`
fragment typeFieldsHelper2 on typeField {
  id
  name
  type
  value
  operator
  checkType {
      ...typeFieldsHelper3
    }
    extendsType {
      ...typeFieldsHelper3
    }
    trueType {
      ...typeFieldsHelper3
    }
    falseType {
      ...typeFieldsHelper3
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
    ...typeFieldsHelper3
  }
  types {
   ...typeFieldsHelper3
  }
  elements {
    ...typeFieldsHelper3
  }
  elementType {
    ...typeFieldsHelper3
  }
  typeArguments {
   ...typeFieldsHelper3
  }
  declaration {
    id
    name
    kindString
    children {
      name
      kindString
      type {
        ...typeFieldsHelper3
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
        ...typeFieldsHelper3
      }
      parameters {
        defaultValue
        flags {
          ...flagFields
        }
        tags {
          ...tagFields
        }
        type {
          ...typeFieldsHelper3
        }
        name
        comment {
          ...commentFields
        }
        type {
          ...typeFieldsHelper3
        }
      }
    }
    indexSignature {
      name
      kindString
      type {
        ...typeFieldsHelper3
      }
      parameters {
        defaultValue
        name
        tags {
          ...tagFields
        }
        comment {
          ...commentFields
        }
        type {
          ...typeFieldsHelper3
        }
      }
    }
  }
}
`

export const typeFieldsHelper3 = graphql`
  fragment typeFieldsHelper3 on typeField {
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
          defaultValue
          tags {
            ...tagFields
          }
          comment {
            ...commentFields
          }
          type {
            ...basicTypeFields
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
          defaultValue
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
