  /**
   * https://graphql.org/learn/schema/
   * https://www.digitalocean.com/community/tutorials/graphql-graphql-sdl
   */
const typeDefs = `
    type Module implements Node {
      name: String!
      kindString: String!
      children: [Symbol!]
      groups: [groupsField!]
      comment: commentField
    }

    type groupsField {
      title: String!
      children: [Int]
    }

    type Symbol implements Node {
      name: String!
      kindString: String!
      id: ID!
      children: [Symbol!]
      groups: [groupsField]
      comment: commentField
      flags: flagsField
      defaultValue: String
      extendedTypes: [typeField!]
      extendedBy: [typeField!]
      implementedTypes: [typeField!]
      implementedBy: [typeField!]
      implementationOf: typeField
      signatures: [signature!]
      getSignature: [signature!]
      setSignature: [signature!]
      overwrites: typeField
      inheritedFrom: typeField
      type: typeField
      typeParameter: [parametersField!]
      target: Int
    }

    type signature {
      name: String!
      kindString: String!
      comment: commentField
      type: typeField
      flags: flagsField
      parameters: [parametersField]
      overwrites: typeField
      inheritedFrom: typeField
      implementationOf: typeField
      typeParameter: [parametersField!]
    }

    type commentField {
      shortText: String
      text: String
      returns: String
      tags: [tagField!]
    }

    type tagField {
      tag: String!
      text: String
    }

    type typeField {
      checkType: typeField
      comment: commentField
      constraint: typeField
      declaration: declarationField
      elementType: typeField
      elements: [typeField]
      extendsType: typeField
      falseType: typeField
      id: Int
      indexType: typeField
      name: String
      objectType: typeField
      operator: String
      queryType: typeField
      target: typeField
      targetType: typeField
      trueType: typeField
      type: String
      typeArguments: [typeField]
      types: [typeField!]
      value: String
    }

    type declarationField {
      id: Int
      name: String
      kindString: String
      flags: flagsField
      signatures: [signature!]
      children: [parametersField!]
      indexSignature: [signature!]
    }


    type parametersField {
      id: Int
      name: String
      kindString: String
      flags: flagsField
      comment: commentField
      type: typeField
      tags: [tagField!]
      defaultValue: String
    }

    type flagsField {
      hasExportAssignment: Boolean
      isAbstract: Boolean
      isConst: Boolean
      isConstructorProperty: Boolean
      isExported: Boolean
      isOptional: Boolean
      isLet: Boolean
      isPrivate: Boolean
      isProtected: Boolean
      isPublic: Boolean
      isReadonly: Boolean
      isRest: Boolean
      isStatic: Boolean
    }
  `

  module.exports = {
    typeDefs
  }