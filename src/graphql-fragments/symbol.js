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
  types {
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
      children {
      name
      kindString
      type {
        name
        type
        id
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
          name
          type
          id
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
            name
            type
            id
          }
        }
      }
      indexSignature {
        name
        kindString
        type {
          name
          type
          id
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
            name
            type
            id
          }
        }
      }
    }
  }
`
