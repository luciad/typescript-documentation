import React from "react";
import { Link } from "gatsby";
import Layout from "../components/page-layout";
import { fixModuleName, pathToModule } from "../util/util";
import { graphql } from "gatsby";

export default ({ data }) => {
  console.log(data)
  const modules = data.allModule.edges.map(edge => edge.node);

  return (
    <Layout>
      <div className="title">Module list</div>
      <ul>
        {modules.map(module => (
          <li>
          {module.kindString} - 
            <Link to={pathToModule(module)}>{fixModuleName(module)}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query AllModulesQuery {
    allModule {
      edges {
        node {
          name
          kindString
          id
          flags {
            isExported
          }
        }
      }
    }
  }
`;
