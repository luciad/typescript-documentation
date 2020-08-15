/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const fs = require("fs")
 const util = require("./src/util/util");
const documentation = require("./content/docu.json");
const documentationPath = require.resolve("./content/docu.json");
const symbolTemplate = require.resolve("./src/components/center/main/template/symbol");
const overviewTemplate = require.resolve("./src/components/center/main/template/overview");
const moduleTemplate = require.resolve("./src/components/center/main/template/module");

console.log("[l-td] Default snippet language: " + process.env.GATSBY_DEFAULT_LAN)

exports.createPages = ({ actions }) => {
  const { createPage } = actions;
  const modules = documentation.children;

  let usedPaths = []
  function checkAndCreatePage(obj){
    if(usedPaths.includes(obj.path)){
      obj.path = obj.path + "_d"
  }
    usedPaths.push(obj.path)
    createPage(obj)
  }

  // module list page
  checkAndCreatePage({
    path: "overview",
    component: overviewTemplate,
    context: {
      modules,
    },
  });

  //createModulePages
  modules.forEach(module => {
    const modulePath = util.pathToModule(module);
    module.path = modulePath
    // 1 page per module
    checkAndCreatePage({
      path: modulePath,
      component: moduleTemplate,
      context: {
        moduleId: String(module.id),
      },
    });

    // 1 page per module export
    const exports = module.children;
    createAllPages(checkAndCreatePage, exports, modulePath, String(module.id))
  });
};

async function createAllPages(checkAndCreatePage, exports, path, moduleID){
  // Create a page for each export and its children
  if(exports){
    exports.forEach(exprt => {
      exprt.path = path + "/" + exprt.name
      checkAndCreatePage({
        path: exprt.path,
        component: symbolTemplate,
        context: {
          moduleId: moduleID,
          symbolId: String(exprt.id)
        }})
        if(exprt.children){
          createAllPages(checkAndCreatePage, exprt.children, exprt.path, moduleID)
        }
      })
  }
}

async function onCreateNode({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) {
  const { createNode, createParentChildLink, createNodeField } = actions;

  // Get file contents (for snippets)
  if (node.internal.type === `File`) {
    fs.readFile(node.absolutePath, undefined, (_err, buf) => {
      createNodeField({ node, name: `contents`, value: buf.toString()});
    });
  }
  // only care about .json content.
  if (
    node.internal.mediaType !== `application/json` ||
    node.absolutePath !== documentationPath
  ) {
    return;
  }

  const content = await loadNodeContent(node);
  const parsedContent = JSON.parse(content);

  const modules = parsedContent.children;


  const createSymbolNode = (symbol, parentNode) => {
    const symbolWithoutChildrenOrId = { ...symbol };
    symbolWithoutChildrenOrId.children = undefined;
    symbolWithoutChildrenOrId.id = undefined;
    const jsonNode = {
      ...symbolWithoutChildrenOrId,
      parent: parentNode.id,
      id: String(symbol.id),
      internal: {
        contentDigest: createContentDigest(symbol),
        type: "Symbol",
      },
    };

    let parentPath = parentNode.fields.path
    createNode(jsonNode);
    createNodeField({ node: jsonNode, name: "path", value:  parentPath + "/" + symbol.name})
    createNodeField({ node: jsonNode, name: "parentPath", value: parentPath})
    createParentChildLink({ parent: parentNode, child: jsonNode });
    if (symbol.children) {
      for (const child of symbol.children) {
        createSymbolNode(child, jsonNode);
      }
    }
  };

  modules.forEach(module => {
    const moduleWithoutChildrenOrId = { ...module };
    moduleWithoutChildrenOrId.children = undefined;
    moduleWithoutChildrenOrId.id = undefined;
    moduleWithoutChildrenOrId.name = undefined;
    const jsonNode = {
      ...moduleWithoutChildrenOrId,
      name: util.fixModuleName(module),
      typeString: module.typeString,
      type: String(module.type),
      id: String(module.id),
      parent: node.id,
      internal: {
        contentDigest: createContentDigest(module),
        type: "Module",
      },
    };
    let pathToModule = util.MODULE_PATH_PREFIX + "/" + jsonNode.name
    createNode(jsonNode)
    createNodeField({ node: jsonNode, name: "path", value: pathToModule})
    createNodeField({ node: jsonNode, name: "parentPath", value: "/overview"})
    createParentChildLink({ parent: node, child: jsonNode });

    // recursively create a symbol for every child
    if(module.children){
      module.children.forEach(child => {
        createSymbolNode(child, jsonNode);
    })}
  });
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  /**
   * https://graphql.org/learn/schema/
   * https://www.digitalocean.com/community/tutorials/graphql-graphql-sdl
   */
  const typeDefs = `
    type Module implements Node {
      name: String!
      kindString: String!
      children: [Symbol!]
      comment: commentField
    }

    type Symbol implements Node {
      name: String!
      kindString: String!
      id: ID!
      children: [Symbol!]
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
  createTypes(typeDefs)
}

exports.onCreateNode = onCreateNode;
