const Parser = require("html-react-parser")

const MODULE_PATH_PREFIX = "/modules"

const fixModuleName = module => {
  return module.name.replace('.d"', "").replace('"', "");
};

const pathToModule = module => {
  return `${MODULE_PATH_PREFIX}/${fixModuleName(module)}`;
};

const pathToExport = (module, exprt) => {
  const modulePath = pathToModule(module);
  return `${modulePath}/${exprt.name}`;
};

function getComments(data){
  const comment = data.comment
  let shortText, text, returns
  let tags = []
  if(comment !== undefined && comment != null){
    shortText = comment.shortText
    text = comment.text
    returns = comment.returns
    if(comment.tags !== undefined && comment.tags !== null){
      for(let tag of comment.tags){
        tags.push({
          tag: tag.tag,
          text: Parser(tag.text)
        })
      }
    }
  }
  if(typeof shortText !== "string") shortText = ""
  if(typeof text !== "string") text = ""
  if(typeof returns !== "string") returns = ""
  shortText = parse(shortText)
  text = parse(text)
  returns = parse(returns)

  return {
    shortText,
    text,
    returns,
    tags
  }
}

function parse(string){
  return Parser(replaceLinks(jsTagToDiv(tabsToDivs(replaceNewLines(string)))))
}

function replaceNewLines(string){
  return string.replace(/\n</g, "<").replace(/>\n/g, ">").replace(/\n/g, "<br/>")
}

function jsTagToDiv(string){
  if(string.includes("```javascript")){
    string = string.replace(new RegExp("```javascript", "g"), "<div class='jspreview'><header>JS</header>")
    string = string.replace(new RegExp("```", "g"), "</div>")
  }
  return string
}

function tabsToDivs(string){
  return string.replace(/[\s]{2}(?!\n)/g, "<div class='tab-content'> &nbsp; </div>")
}

function getParameters(data){
  const parameters = data.parameters
  let returnParameters = []
  if(parameters !== undefined && parameters != null){
    for(let parameter of parameters){
      returnParameters.push({
        comments: getComments(data),
        name: parameter.name,
        type: parameter.type.name
      })
    }
  }
  return returnParameters
}

function replaceLinks(string){
  let safety = 100
  while(string.includes("{@link") && safety > 0){
    console.log(string)
    const startI = string.indexOf("{@link")
    const endI = string.indexOf("}", startI)
    if(endI < 0) break
    let value = string.substring(startI + 6, endI)
    let link = ""
    if(value.includes("\"")){
      const startI = value.indexOf("\"") + 1
      let endI = value.indexOf("\"", startI)
      link = "modules/" + value.substring(startI, endI).replace(/.d/g, "")
      if(value.charAt(endI + 1) === "."){
        const dotI = endI + 1
        endI = value.indexOf(" ", dotI)
        link += "/" + value.substring(dotI + 1, endI)
      }
      value = value.substring(0, startI - 1) + value.substring(endI + 1)
    }
    const linkStr = "<a href='/" + link + "'>" + value + "</a>"
    string = string.substring(0, startI) + linkStr + string.substring(endI + 1)
    safety--
  }
  return string
}

function getSignatures(data){
  let signatures = []

  if(data.signatures !== null && data.signatures !== undefined) signatures.push(...data.signatures)
  if(data.getSignature !== null && data.signatures !== undefined) signatures.push(...data.getSignature)
  if(data.setSignature !== null && data.signatures !== undefined) signatures.push(...data.setSignature)
  return signatures
}

function getFlags(data){
  const flags = data.flags
  let flagList = []
  if(flags !== null && flags !== undefined){
    flagList = Object.getOwnPropertyNames(flags).toString().split(",")
  }
  let returnFlags = [] 
  for(let flag of flagList){
    if(flags[flag] === true) returnFlags.push(flag)
  }
  return returnFlags
}

module.exports = {
  MODULE_PATH_PREFIX,
  fixModuleName,
  pathToModule,
  pathToExport,
  getComments,
  getParameters,
  getSignatures,
  getFlags
};
