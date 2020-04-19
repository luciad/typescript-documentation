import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/page-layout"
import { fixModuleName, pathToModule } from "../util/util"
import Body from "./about/body"
import Icon from './icon'

/**
 * Items inside of modules
 * 
 */
export default ({ data }) => {
  console.log(data)
  const { symbol: exprt, module } = data;

  return (
    <Layout>
      Module:
      <Link to={pathToModule(module)}>{fixModuleName(module)}</Link> 
      <br/>
      Parent:
      <Link to={exprt.fields.parentPath}>{exprt.fields.parentPath}</Link>       
      <div className="title">{exprt.name}</div>
      <div className="sidecontainer">
          <Icon kindString={exprt.kindString}/>
          <div className="kindString">
            {exprt.kindString}
          </div>
        </div>
      <Body data={exprt}/>
    </Layout>
    
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

