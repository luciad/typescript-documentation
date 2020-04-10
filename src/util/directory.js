
function getAllDirectories(data){
  let directories = { 
    name: "root",
    next: []
  }

  for(let node of data.allModule.nodes){
    const currentDir = node.name.split("/")
    let activeDir = directories

    for(let i = 0; i < currentDir.length; i++){

      if(!activeDir.next.some(item => item.name === currentDir[i])){
        activeDir.next.push({
          name: currentDir[i],
          next: []
        })
      }
      activeDir = activeDir.next.find(dir => {
        return dir.name === currentDir[i]
      })
    }
  }
  console.log(directories)
  return directories
}

module.exports = {
  getAllDirectories
}

