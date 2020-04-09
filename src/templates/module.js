import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/page-layout";
import { fixModuleName, pathToModule } from "../util/util";
import Body from "./body"
import Icon from "./icon"

export default ({ data }) => {
  const module = data.module;
  module.exports = data.module.childrenSymbol;

  return (
    <Layout>
      <Link to="/overview">Overview</Link>
      <div className="title">{fixModuleName(module)}</div>
      <div className="sidecontainer">
        <Icon kindString={module.kindString}/> 
        <div className="kindString">{module.kindString}</div>
      </div>
      <Body data={module}/>
    </Layout>
  );
};

export const query = graphql`
  query ModuleQuery($moduleId: String) {
    module(id: { eq: $moduleId }) {
      ...moduleFields
    }
  }
`;
