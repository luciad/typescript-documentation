import React, { Component } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../../page-layout"
import { fixModuleName, pathToModule, MODULE_PATH_PREFIX } from "../../../../util/util"
import Body from "../general/body/body"
import Icon from '../../../general/icon'
import Header from "../../../general/header"
import SignatureSummary from "../general/body/signature/signature-summary"
import Type from "../general/body/type/type"
import SymbolTitle from "../symbol-title"

/**
 * Items inside of modules
 *
 * Contains:
 * - Link to module
 * - Link to parent
 * - Name
 * - kindString & its icon
 * - its body (see body.js)
 */
export default ({ data }) => {
  if(!data) return null
  const { symbol, module } = data;
  return (
    <div className="symbol">
      <Header siteTitle={symbol.name} />
      <Layout>
        <BreadCrumbs path={symbol.fields.parentPath}/>
        {/* Module: &nbsp;
        <Link to={pathToModule(module)}>{fixModuleName(module)}</Link>
        <br/>
        Parent: &nbsp; &nbsp;
        <Link to={symbol.fields.parentPath}>{symbol.fields.parentPath.replace(MODULE_PATH_PREFIX + "/","")}</Link> */}
        <div>
        <SymbolTitle data={symbol}/>
          <div className="bottom inline-block">
            <Type data={symbol} delimiter={" : "} noIsOptionalMarker={true}/>
          </div>
        </div>
        <div className="sidecontainer">
          <Icon kindString={symbol.kindString}/>
          <div className="kind-string">
            {symbol.kindString}
          </div>
        </div>
        <SignatureSummary data={symbol}/>
        <Body data={symbol}/>
      </Layout>
    </div>
  )
}

class BreadCrumbs extends Component {
  constructor(props){
    super(props)
    this.path = props.path
  }
  render(){
    const splitPath = this.path.replace(MODULE_PATH_PREFIX + "/","").split("/")
    const splitLink = []
    for(let i = 0; i < splitPath.length; i++){
      splitLink[i] = MODULE_PATH_PREFIX + "/" + splitPath.slice(0, i +1).join("/")
    }
    return(
      <div className="breadcrumbs sidecontainer">
        {splitPath.map((path, i) =>
        <>
        {i > 0 && <>&nbsp;{">"}&nbsp;</>}
        <Link to={splitLink[i]}>{path}</Link>
        </>)}
      </div>
    )
  }
}

export const query = graphql`
  query SymbolQuery($symbolId: String, $moduleId: String) {
    symbol(id: { eq: $symbolId }) {
      ...symbolFields
    }
    module(id: { eq: $moduleId }) {
      id,
      name
    }
  }
`
