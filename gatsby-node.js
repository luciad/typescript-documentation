/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const fs = require("fs")
const util = require("./src/util/util");
const utilDirectory = require("./src/util/directory")
const typeDefs = require("./type-defs")
const documentation = require("./content/docu.json");
const documentationPath = require.resolve("./content/docu.json");
const symbolTemplate = require.resolve("./src/components/template/symbol");
const overviewTemplate = require.resolve("./src/components/template/overview");
const moduleTemplate = require.resolve("./src/components/template/module");
const directoryTreeTemplate = require.resolve("./src/components/template/directory-tree");

console.log("[l-td] Default snippet language: " + process.env.GATSBY_DEFAULT_LAN)
console.log("[l-td] Prefix: " + process.env.GATSBY_PREFIX)
process.env.GATSBY_PROJECT_NAME = documentation.name

exports.createPages = ({ actions }) => {
  const { createPage } = actions
  const modules = documentation.children

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
    path: "/",
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

  //pages for breadcrumbs
  const allDirectories = utilDirectory.getAllDirectories({allModule: {nodes: modules}})
  createDirectoryPages(allDirectories)

  function createDirectoryPages(directoryTree){
    if(!directoryTree || !directoryTree.path) return null
    checkAndCreatePage({
      path: directoryTree.path.replace(/\"/g, "").replace(".d", ""),
      component: directoryTreeTemplate,
      })
      directoryTree.next.forEach(tree => createDirectoryPages(tree))
  }
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
    createNodeField({ node: jsonNode, name: "parentPath", value: "/"})
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
  createTypes(typeDefs.typeDefs)
}

/**
 * https://www.gatsbyjs.com/docs/add-custom-webpack-config/
 */
exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
  const config = getConfig()
  config.module.rules = [
    // Omit the default rule where test === '\.jsx?$'
    ...config.module.rules.filter(
      rule => String(rule.test) !== String(/\.jsx?$/)
    ),
    // Recreate it with custom exclude filter
    {
      ...loaders.js(),
      test: /\.jsx?$/,
      // Exclude all node_modules from transpilation, except for 't-td'
      exclude: modulePath =>
        /node_modules/.test(modulePath) &&
        !/node_modules\/(l-td)/.test(modulePath),
    },
  ]
  // This will completely replace the webpack config with the modified object.
  actions.replaceWebpackConfig(config)
}

exports.onCreateNode = onCreateNode;
