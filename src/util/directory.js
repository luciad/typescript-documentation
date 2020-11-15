const util = require("./util")

/**
 * Returns structured tree of all directories
 * each node has:
 *  node.name
 *  node.next
 *  node.path
 * Start node has:
 *  node.name = "root"
 *  node.path = "/"
 *
 * @param {} data data.allModules.nodes
 * @returns directoryTree
 */
function getAllDirectories(data, fixNames){
  let directories = {
    name: "root",
    next: [],
    path: util.MODULE_PATH_PREFIX
  }

  for(let node of sortModules(data.allModule.nodes)){
    const currentDir = (fixNames ? util.fixModuleName(node) : node.name).split("/")
    let activeDir = directories

    let currentPath = util.MODULE_PATH_PREFIX
    for(let i = 0; i < currentDir.length; i++){
      currentPath += "/" + currentDir[i]
      if(!activeDir.next.some(item => item.name === currentDir[i])){
        activeDir.next.push({
          name: currentDir[i],
          next: [],
          path: currentPath
        })
      }
      activeDir = activeDir.next.find(dir => {
        return dir.name === currentDir[i]
      })
    }
  }
  return directories
}

/**
 * Sorts modules according to replace rules
 *
 * @param {String} modules
 * @returns sorted modules
 */
function sortModules(modules){
  const replacementRulesOrder = process.env.GATSBY_REPL_PACK_NAMES.split(";").map(a => a.split(",")).map(b => b[1])

  return modules.sort((a, b) => {
    const indexA = startsWithIndex(a.name, replacementRulesOrder)
    const indexB = startsWithIndex(b.name, replacementRulesOrder)
    if(indexA > indexB) return 1
    if(indexA < indexB) return -1
    return a.name > b.name ? 1 : -1
  })
}

/**
 * returns the index of the array of which the string starts with
 *
 * @param {String} string
 * @param {String[]} array
 * @returns index or -1 if not found
 */
function  startsWithIndex(string, array){
  for(let [i,arrayItem] of array.entries()){
    if(string.startsWith(arrayItem)) return i
  }
  return -1
}

/**
 * Returns similarity between two directories
 *
 * @param {string} dir1
 * @param {string} dir2
 *
 * @returns {number} similarity (higher is more similar)
 */
function similarity(dir1, dir2){
  let similarity = 0;
  for(let i = 0; i < Math.min(dir1.length, dir2.length); i++){
    if(dir1.charAt(i) === dir2.charAt(i)){
      similarity++;
    }else{
      break;
    }
  }
  return similarity
}

/**
 * Returns page where its path is most similar to the provided dir
 *
 * @param {array} pageObjects
 * @param {string} dir
 * @param {string} name
 *
 * @returns {object} pageObject
 */
function getMostSimilarPage(pageObjects, dir, name){
  if(!(pageObjects.length > 0)) return null
  if(typeof dir !== "string") dir = ""
  dir = dir.replace(util.MODULE_PATH_PREFIX + "/", "")

  let maxSimilarity = -1
  let mostSimilarPage = pageObjects[0]
  for(let page of pageObjects){
    if(page.path && page.path.includes(name.replace(" ", "/"))){
      let pageDir = page.path.replace(util.MODULE_PATH_PREFIX + "/", "")
      let currentSimilarity = similarity(dir, pageDir)
      if(page.path.endsWith("/" + name)){
        currentSimilarity += 10000      //favour matching names
      }
      if(currentSimilarity > maxSimilarity){
        maxSimilarity = currentSimilarity
        mostSimilarPage = page
      }
    }
  }
  return mostSimilarPage
}

module.exports = {
  getAllDirectories,
  getMostSimilarPage,
  sortModules
}
