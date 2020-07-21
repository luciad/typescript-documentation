import React from "react"
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
    <>
      <Header siteTitle={symbol.name} />
      <Layout>
        Module: &nbsp;
        <Link to={pathToModule(module)}>{fixModuleName(module)}</Link>
        <br/>
        Parent: &nbsp; &nbsp;
        <Link to={symbol.fields.parentPath}>{symbol.fields.parentPath.replace(MODULE_PATH_PREFIX + "/","")}</Link>
        <div className="sidecontainer">
        <SymbolTitle data={symbol}/>
          <div className="bottom"><Type data={symbol} colon={true} noIsOptionalMarker={true}/></div>
        </div>
        <div className="sidecontainer">
          <Icon kindString={symbol.kindString}/>
          <div className="kindString">
            {symbol.kindString}
          </div>
        </div>
        <SignatureSummary data={symbol}/>
        <Body data={symbol}/>
      </Layout>
    </>
  );
};

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
`;
