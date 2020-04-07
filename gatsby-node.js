/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const util = require("./src/util/util");
const documentation = require("./content/docu.json");
const documentationPath = require.resolve("./content/docu.json");

exports.createPages = ({ actions }) => {
  const { createPage } = actions;

  const overviewTemplate = require.resolve("./src/templates/overview");
  const moduleTemplate = require.resolve("./src/templates/module");
  const symbolTemplate = require.resolve("./src/templates/symbol");

  const modules = documentation.children;

  // module list page
  createPage({
    path: "overview",
    component: overviewTemplate,
    context: {
      modules,
    },
  });

  modules.forEach(module => {
    const modulePath = util.pathToModule(module);
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
    exports.forEach(exprt => {
      createPage({
        path: modulePath + "/" + exprt.name,
        component: symbolTemplate,
        context: {
          moduleId: String(module.id),
          symbolId: String(exprt.id)
        }
      });
    });
  });
};

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
  const { createNode, createParentChildLink } = actions;

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
    createNode(jsonNode);
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
    createNode(jsonNode);
    createParentChildLink({ parent: node, child: jsonNode });

    // recursively create a symbol for every child
    module.children.forEach(child => {
      createSymbolNode(child, jsonNode);
    });
  });
}

exports.onCreateNode = onCreateNode;
