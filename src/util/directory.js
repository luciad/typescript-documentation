
function getAllDirectories(data){
  let directories = { 
    name: "root",
    next: []
  }
  for(node of data.allModule.nodes){
    const currentDir = node.name.split("/")
    let activeDir = directories

    for(let i = 0; i < currentDir.length; i++){
      if(!activeDir.next.includes(currentDir)){
        activeDir.next.push({
          name: currentDir,
          next: []
        })
      }
      activeDir = activeDir.next.find(dir => {
        return dir.name === currentDir
      })
    }
  }
  return directories
}

