import React from "react";
import { graphql } from "gatsby";
import Layout from "../page-layout";
import { fixModuleName, pathToModule } from "../../util/util";
import Body from "../body/body"
import Header from "./general/header"
import BreadCrumbs from "./general/bread-crumbs"

/**
 * Highest level modules
 *
 * Contains:
 * - module name
 * - kindsString
 * - summary of its body
 *
 */
export default ({ data }) => {
  if(!data) return null
  const module = data.module;
  module.exports = data.module.children;

  return (
    <div className="module">
      <Header siteTitle={fixModuleName(module) + " (module)"} />
      <Layout>
        <BreadCrumbs path={pathToModule(module)}/>
        <div className="title">{fixModuleName(module)}</div>
        <div className="sidecontainer">
          <div className="kind-string">{module.kindString}</div>
        </div>
        <Body data={module} shortListOnly={true}/>
      </Layout>
    </div>
  );
};

export const query = graphql`
  query ModuleQuery($moduleId: String) {
    module(id: { eq: $moduleId }) {
      ...moduleFields
    }
  }
`;
