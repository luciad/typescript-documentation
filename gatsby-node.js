/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const util = require("./src/util/util");
const documentation = require("./content/docu.json");
const documentationPath = require.resolve("./content/docu.json");
const symbolTemplate = require.resolve("./src/templates/symbol");

exports.createPages = ({ actions }) => {
  const { createPage } = actions;

  const overviewTemplate = require.resolve("./src/templates/overview");
  const moduleTemplate = require.resolve("./src/templates/module");
  

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
  // only care about documentation.json content.
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
    let pathToModule = "/modules/" + jsonNode.name
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

exports.onCreateNode = onCreateNode;
