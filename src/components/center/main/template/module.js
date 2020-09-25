import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../../../page-layout";
import { fixModuleName, fixModulePath, pathToModule } from "../../../../util/util";
import Body from "../general/body/body"
import Icon from "../../../general/icon"
import Header from "../../../general/header"
import BreadCrumbs from "./bread-crumbs"

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
          <Icon kindString={module.kindString}/>
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
