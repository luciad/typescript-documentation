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
  let shortText, text
  let tags = []
  if(comment !== undefined && comment != null){
    shortText = comment.shortText
    text = comment.text
    if(comment.tags !== undefined && comment.tags !== null) tags = comment.tags
  }
  if(typeof shortText !== "string") shortText = ""
  if(typeof text !== "string") text = ""
  shortText = Parser(shortText)
  text = Parser(text)

  return {
    shortText,
    text,
    tags
  }
}


function getParameters(data){
  const parameters = data.parameters
  let returnParameters = []
  if(parameters !== undefined && parameters != null){
    for(let parameter of parameters){
      returnParameters.push({
        name: parameter.name,
        type: parameter.type.name
      })
    }
  }
  return returnParameters
}

function getSignatures(data){
  let signatures = []

  if(data.signatures !== null && data.signatures !== undefined) signatures.push(...data.signatures)
  if(data.getSignature !== null && data.signatures !== undefined) signatures.push(...data.getSignature)
  if(data.setSignature !== null && data.signatures !== undefined) signatures.push(...data.setSignature)
  return signatures
}

module.exports = {
  MODULE_PATH_PREFIX,
  fixModuleName,
  pathToModule,
  pathToExport,
  getComments,
  getParameters,
  getSignatures
};
