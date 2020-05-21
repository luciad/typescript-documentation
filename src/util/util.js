const Parser = require("html-react-parser")

const MODULE_PATH_PREFIX = "/modules"

const fixModuleName = module => {
  if(!module) return "404"
  return module.name.replace('.d"', "").replace('"', "");
};

const pathToModule = module => {
  return `${MODULE_PATH_PREFIX}/${fixModuleName(module)}`;
};

const pathToExport = (module, exprt) => {
  const modulePath = pathToModule(module);
  return `${modulePath}/${exprt.name}`;
};

/**
 * returns object with shortText, text, tags and returns of data, empty string if none available.
 * 
 * @param {*} data object to get comments from
 * @returns object.shortText, object.text, object.returns, object.tags 
 */
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
          text: tag.text
        })
      }
    }
  }
  if(typeof shortText !== "string") shortText = ""
  if(typeof text !== "string") text = ""
  if(typeof returns !== "string") returns = ""
  returns = parse(returns)

  return {
    shortText,
    text,
    returns,
    tags
  }
}

/**
 * Removes garbage, replaces \n with <br/>, replaces tabs with &nbsp; and parses this all to html with html-react-parser
 * 
 * @param {string} string 
 * @returns parsed object
 */
function parse(string){
  if(typeof string !== "string") string = ""
  return Parser(jsTagToDiv(tabsToDivs(replaceNewLines(string))))
}

/**
 * replaces all \n with <br/>, except for the \n before < or after >
 * 
 * @param {string} string
 * @returns string without \n 
 */
function replaceNewLines(string){
  return string.replace(/\n</g, "<").replace(/>\n/g, ">").replace(/\n/g, "__newline__<br/>").replace(/__newline__/g, "\n")
}

/**
 * changes ```javascript and ```json to <div class=jspreview><header>JS/JSON</header>code</div>
 * @param {string} string 
 * @returns string without ```javascript/json
 */
function jsTagToDiv(string){
  if(string.includes("```")){
    string = string.replace(new RegExp("```javascript", "g"), "<pre><code class='language-javascript'>")
    string = string.replace(new RegExp("```json", "g"), "<pre><code class='language-json'>")
    string = string.replace(new RegExp("```css", "g"), "<pre><code class='language-css'>")
    string = string.replace(new RegExp("```", "g"), "</code></pre>")
  }
  return string
}

/**
 * replaces all double spaces that are not infront of a \n with &nbsp; in a class=tab-content div
 * @param {string} string 
 * @returns string without double spaces
 */
function tabsToDivs(string){
  return string.replace(/[\s]{2}(?!\n)/g, "<div class='tab-content'> &nbsp; </div>")
}

/**
 * returns list of objects with comment, name and type of parameters
 * 
 * @param {*} data
 * @returns list of object.comments, object.name, object.type 
 */
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

/**
 * Parses {@Link .. } from the rest of the test
 * 
 * @param {string} string
 * @returns list of object.text, object.type, object.link where object.type == "link" || "text" 
 */
function getLinks(string){
  let retVals = []
  let safety = 100
  while(string.includes("{@") && safety > 0){
    const startI = string.indexOf("{@")
    const endI = string.indexOf("}", startI)
    if(endI < 0) break
    let info = string.substring(startI + 2, endI)
    let type = info.substring(0, info.indexOf(" "))
    let value = info.substring(info.indexOf(" "))
    let link = ""
    let path
    if(value.includes("\"")){
      const startI = value.indexOf("\"") + 1
      let endI = value.indexOf("\"", startI)
      path = value.substring(startI, endI)
      value = value.substring(0, startI - 1) + value.substring(endI + 1)
    }

    let currentText = {
      text: parse(string.substring(0, startI)),
      type: "text",
    }

    let currentLink = {
      text: value,
      type,
      link,
      path,
    }

    retVals.push(currentText)
    retVals.push(currentLink)
    string = string.substring(endI + 1)
    safety--
  }
  if(string.length > 0){
    let lastText = {
      text: parse(string),
      type: "text",
    }
    retVals.push(lastText)
  }
  return retVals
}

/**
 * returns signatures
 * 
 * @param {} data 
 * @returns signatures
 */
function getSignatures(data){
  let signatures = []

  if(data.signatures !== null && data.signatures !== undefined) signatures.push(...data.signatures)
  if(data.getSignature !== null && data.signatures !== undefined) signatures.push(...data.getSignature)
  if(data.setSignature !== null && data.signatures !== undefined) signatures.push(...data.setSignature)
  return signatures
}

/**
 * returns flags of object
 * 
 * @param {*} data 
 * @returns list of flags
 */
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
  getFlags,
  getLinks
};
