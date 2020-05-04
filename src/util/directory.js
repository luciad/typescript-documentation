
function getAllDirectories(data){
  let directories = { 
    name: "root",
    next: [],
    path: "/"
  }

  for(let node of data.allModule.nodes){
    const currentDir = node.name.split("/")
    let activeDir = directories

    let currentPath = "/modules"
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

function similarity(dir1, dir2){
  let similarity = 0;
  for(let i = 0; i < Math.min(dir1.length, dir2.length); i++){
    if(dir1.charAt(i) === dir2.charAt(i)){
      similarity++;
    }else{
      break;
    }
  }
}

function getMostSimilarPage(pageObjects, dir){
  if(!(pageObjects.length > 0)) return null
  if(typeof dir !== "string") dir = ""

  let maxSimilarity = 0
  let mostSimilarPage = pageObjects[0]
  for(let page of pageObjects){
    if(page.path){
      let pageDir = page.path.replace("/modules/", "")
      let currentSimilarity = similarity(dir, pageDir)
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

