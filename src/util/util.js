const Parser = require("html-react-parser")
const Sanitizer = require("sanitize-html")

const MODULE_PATH_PREFIX = "/modules"

/**
 * Returns module.name without double quotes and without .d
 *
 * @param {*} module module.name
 */
const fixModuleName = module => {
  if(!module || !module.name) {
    console.warn("[l-td] module name not found. Module: ", module)
    return "404"
  }
  return replacePackageName(module.name.replace('.d"', "").replace(/"/g, ""))
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
    shortText: trimNewLines(shortText),
    text: trimNewLines(text),
    returns: trimNewLines(returns),
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
  let fixedText = codeTagToDiv(replaceDoubleNewLines(trimNewLines(string)))
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
    const j = nextSpace < 0 ? nextNewLine : nextNewLine < 0 ? nextSpace : Math.min(nextNewLine, nextSpace) // the character after language definition
    if(j > i + 4){  //if a language is specified
      let prefix = "<pre><code class='language-"
      string = string.substring(0,  j) + "'>" + string.substring(j)
      string = string.replace("```",  prefix)
    }else{
      string = string.replace("```", "<pre><code class='language-none'>")
    }
    string = string.replace("```", "</code></pre>")
    let k = string.lastIndexOf("</code></pre>")
    string = string.substring(0, i) + replaceNewLines(string.substring(i, k)) + string.substring(k) // make newLines and tabs in code fragments HTML friendly
  }
  return string
}

/**
 * Remove trailing <br/>'s from string
 * @param {String} string string to remove <br/>'s from
 * @returns string without trailing <br/>'s
 */
function removeTrailingBrs(string){
  return string.replace(/(<br\/>\s*)+$/, "")
}

function trimNewLines(string){
  return string.replace(/((\n\s*)+$)/, "").replace(/^(\s*\n)+/, "")
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
    if(endI < 0) {
      console.warn("[l-td] A '{@' link was opened but never closed. String: ", string)
      break
    }
    let info = string.substring(startI + 2, endI)
    let type = info.substring(0, info.indexOf(" "))
    let value = info.substring(info.indexOf(" ") + 1)


    let currentText = {
      text: string.substring(0, startI),
      type: "text",
    }

    let currentLink = {
      text: value,
      type,
    }

    retVals.push(currentText)
    retVals.push(currentLink)
    string = string.substring(endI + 1)
  }
  if(string.length > 0){
    let lastText = {
      text: string,
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

/**
 * Replaces package name if specified with env var GATSBY_REPL_PACK_NAMES
 *
 * example of expected above env var: "package,this/package;otherPackage,newName"
 * @param {String} packageName
 * @returns {String} package name changed according to rules
 */
function replacePackageName(packageName){
  let rules = process.env.GATSBY_REPL_PACK_NAMES
  if(!rules || rules.length === 0) return packageName

  rules = rules.split(";")
  rules = rules.map(a => a.split(","))

  for(let rule of rules){
    packageName = packageName.replace(new RegExp("^" + rule[0]), rule[1])
  }
  return packageName
}

function getEventOnNames(data){
  let names = []
  for(let signature of data.signatures){
    try{
      const name = signature.parameters[0].type.value
      if(name) names.push(name)
    } catch(e){}
  }
  return names
}

module.exports = {
  MODULE_PATH_PREFIX,
  fixModuleName,
  pathToModule,
  pathToExport,
  getComments,
  getSignatures,
  getFlags,
  getLinks,
  parse,
  replacePackageName,
  getEventOnNames
};
