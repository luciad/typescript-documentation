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
function getAllDirectories(data){
  let directories = {
    name: "root",
    next: [],
    path: "/"
  }

  for(let node of data.allModule.nodes){
    const currentDir = node.name.split("/")
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
      if(page.name.toLowerCase() === name.toLowerCase()){
        currentSimilarity += 1000      //favour matching names
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
  getMostSimilarPage
}
