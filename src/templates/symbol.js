import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/page-layout";
import { fixModuleName, pathToModule } from "../util/util";
import Leaf from "./leaf"
import About from "./about"

export default ({ data }) => {
  console.log(data)
  const { symbol: exprt, module } = data;
  const children = exprt.childrenSymbol;

  return (
    <Layout>
      <p>
        <Link to={pathToModule(module)}>{fixModuleName(module)}</Link>
      </p>
      <div className="title">{exprt.name}</div>
      <i>{exprt.kindString}</i>
      <About data={exprt}/>

      {children.size !== 0 && 
        <div className="subsubtitle">Children</div>}
      <ul>
        {children.map(child => (
          <li>{child.name}</li>
        ))}
      </ul>

      {children.map(child => (
        <Leaf data={child}/>
      ))}
    </Layout>
    
  );
};

export const query = graphql`
  query SymbolQuery($symbolId: String, $moduleId: String) {
    symbol(id: { eq: $symbolId }) {
      name
      kindString
      id
      comment {
        shortText
        text
        tags {
          tag
          text
        }
      }
      childrenSymbol {
        name,
        kindString,
        signatures {
          name,
          kindString,
          comment {
            shortText,
          },
          type {
            type,
            name
          }
        },
        getSignature {
          name,
          kindString,
          comment {
            shortText,
          }
          type {
            type,
            name
          }
        },
        setSignature {
          name,
          kindString,
          comment {
            shortText,
          }
          type {
            type,
            name
          }
          parameters {
            name
            type {
              name
            }
          }
        }
        comment {
          shortText
          text
          tags {
            tag
            text
          }
        }
      }
    }

    module(id: { eq: $moduleId }) {
      name
    }
  }
`;

