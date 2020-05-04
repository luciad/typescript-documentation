import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/page-layout";
import { fixModuleName } from "../util/util";
import BodySummary from "./about/body-summary"
import Icon from "./icon"

/**
 * Highest level modules
 * 
 * Contains:
 * - module name
 * - kindsString & its icon
 * - summary of its body (see body-summary.js)
 * 
 */
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
      <BodySummary data={module}/>
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
