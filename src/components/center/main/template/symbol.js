import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../../page-layout"
import { fixModuleName, pathToModule } from "../../../../util/util"
import Body from "../general/body/body"
import Icon from '../../../general/icon'
import Header from "../../../general/header"

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
  const { symbol, module } = data;

  return (
    <>
      <Header siteTitle={symbol.name} />
      <Layout>
        Module: &nbsp;
        <Link to={pathToModule(module)}>{fixModuleName(module)}</Link>
        <br/>
        Parent: &nbsp; &nbsp;
        <Link to={symbol.fields.parentPath}>{symbol.fields.parentPath.replace("/modules/","")}</Link>
        <div className="title">{symbol.name}</div>
        <div className="sidecontainer">
          <Icon kindString={symbol.kindString}/>
          <div className="kindString">
            {symbol.kindString}
          </div>
        </div>
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
