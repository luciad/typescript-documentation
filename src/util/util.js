const Parser = require("html-react-parser")
const Sanitizer = require("sanitize-html")

const MODULE_PATH_PREFIX = "/modules"

/**
 * Returns module.name without double quotes and without .d
 *
 * @param {*} module module.name
 */
const fixModuleName = module => {
  if(!module || !module.name) return "404"
  return module.name.replace('.d"', "").replace('"', "");
};

/**
 * Returns relative URL to module page
 * Assumes module.name of form: "moduleName.d" || moduleName || "moduleName"
 * @param {*} module module.name
 */
const pathToModule = module => {
  return `${MODULE_PATH_PREFIX}/${fixModuleName(module)}`;
};

/**
 * Return relative URL to export page
 * @param {*} module module.name
 * @param {*} exprt exprt.name
 */
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

  if(comment){
    shortText = comment.shortText
    text = comment.text
    returns = comment.returns
    if(comment.tags){
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
  let fixedText = codeTagToDiv(replaceDoubleNewLines(string))
  return Parser(Sanitizer(fixedText, {
    //allow all attributes:
    allowedAttributes: false,
  }))
}

/**
 * replaces all  \n with <br/>, except for the \n before < or after >
 *
 * @param {string} string
 * @returns string without \n
 */
function replaceNewLines(string){
  return removeTrailingBrs(string.replace(/\n</g, "<").replace(/>\n/g, ">").replace(/\n/g, "\n<br/>"))
}

/**
 * replaces all  double \n with <br/>, except for the \n before < or after >
 *
 * @param {string} string
 * @returns string without \n
 */
function replaceDoubleNewLines(string){
  return removeTrailingBrs(string.replace(/\n</g, "<").replace(/>\n/g, ">").replace(/\n\s*\n/g, "<br/>"))
}

/**
 * changes eg. ```javascript  to <pre><code class='language-javascript'>
 * and the following ``` to </code></pre>
 *
 * If no language is specified, the assigned class is language-none
 *
 * @param {string} string string to convert
 * @returns string with ``` turned into <pre><code>
 */
function codeTagToDiv(string){
  while(string.includes("```")){
    let i = string.indexOf("```")
    const nextSpace = string.indexOf(" ", i)
    const nextNewLine = string.indexOf('\n', i)
    const j = nextSpace < 0 ? nextNewLine : nextNewLine < 0 ? nextSpace : Math.min(nextNewLine, nextSpace) //the character after language definition
    if(j > i + 4){  //if a language is specified
      let prefix = "<pre><code class='language-"
      string = string.substring(0,  j) + "'>" + string.substring(j)
      string = string.replace("```",  prefix)
    }else{
      string = string.replace("```", "<pre><code class='language-none'>")
    }
    string = string.replace("```", "</code></pre>")
    let k = string.lastIndexOf("</code></pre>")
    string = string.substring(0, i) + tabsToHTML(replaceNewLines(string.substring(i, k))) + string.substring(k) // make newLines and tabs in code fragments HTML friendly
  }
  return string
}

/**
 * replaces all double spaces that are not in front of a \n with a double &nbsp;
 * @param {string} string
 * @returns string with replaced double spaces
 */
function tabsToHTML(string){
  return string.replace(/[\s]{2}/g, " &nbsp;&nbsp; " )
}

/**
 * Remove trailing <br/>'s from string
 * @param {String} string string to remove <br/>'s from
 * @returns string without trailing <br/>'s
 */
function removeTrailingBrs(string){
  return string.replace(/(<br\/>\s*)+$/, "")
}
/**
 * returns list of objects with comment, name and type of parameters
 *
 * @param {*} data data.parameters, data.comments
 * @returns list of object.comments, object.name, object.type
 */
function getParameters(data){
  const parameters = data.parameters
  let returnParameters = []
  if(parameters){
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
 * Parses {@Link .. }, {@img path}  etc. from the rest of the text
 *
 * @param {string} string string to parse
 * @returns list of object.text, object.type, object.link where object.type == "link" || "text"
 */
function getLinks(string){
  let retVals = []
  while(string.includes("{@")){
    const startI = string.indexOf("{@")
    const endI = string.indexOf("}", startI)
    if(endI < 0) break
    let info = string.substring(startI + 2, endI)
    let type = info.substring(0, info.indexOf(" "))
    let value = info.substring(info.indexOf(" ") + 1)
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
      path,
    }

    retVals.push(currentText)
    retVals.push(currentLink)
    string = string.substring(endI + 1)
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

  if(data.signatures) signatures.push(...data.signatures)
  if(data.getSignature) signatures.push(...data.getSignature)
  if(data.setSignature) signatures.push(...data.setSignature)
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
  if(flags){
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
