/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const util = require("./src/util/util");
const documentation = require("./content/docu.json");
const documentationPath = require.resolve("./content/docu.json");
const symbolTemplate = require.resolve("./src/components/center/main/template/symbol");
const overviewTemplate = require.resolve("./src/components/center/main/template/overview");
const moduleTemplate = require.resolve("./src/components/center/main/template/module");

exports.createPages = ({ actions }) => {
  const { createPage } = actions;
  const modules = documentation.children;

  // module list page
  createPage({
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
    createPage({
      path: modulePath,
      component: moduleTemplate,
      context: {
        moduleId: String(module.id),
      },
    });

    // 1 page per module export
    const exports = module.children;
    createAllPages(createPage, exports, modulePath, String(module.id))
  });
};

async function createAllPages(createPage, exports, path, moduleID){
  // Create a page for each export and its children
  exports.forEach(exprt => {
    exprt.path = path + "/" + exprt.name
    createPage({
      path: exprt.path,
      component: symbolTemplate,
      context: {
        moduleId: moduleID,
        symbolId: String(exprt.id)
      }})
      if(exprt.children){
        createAllPages(createPage, exprt.children, exprt.path, moduleID)
      }
    })
}

async function onCreateNode({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) {
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
  const { createNode, createParentChildLink, createNodeField } = actions;


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
    module.children.forEach(child => {
      createSymbolNode(child, jsonNode);
    });
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
      overwrites: nameType
      inheritedFrom: nameType
      type: typeField
    }

    type nameType {
      id: Int
      name: String
    }

    type signature {
      name: String!
      kindString: String!
      comment: commentField
      type: typeField
      parameters: [parametersField]
      overwrites: nameType
      inheritedFrom: nameType
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
      id: Int
      name: String
      type: String
      types: [typeField!]
      elementType: typeField
      typeArguments: [typeField]
      declaration: declarationField
    }

    type declarationField {
      id: Int
      name: String
      kindString: String
      flags: [flagsField!]
      signatures: [signature!]
    }

    type parametersField {
      name: String
      type: typeField
      comment: commentField
    }

    type flagsField {
      isExported: Boolean
      isOptional: Boolean
      isPrivate: Boolean
      isStatic: Boolean
      isAbstract: Boolean
    }
  `
  createTypes(typeDefs)
}

exports.onCreateNode = onCreateNode;
