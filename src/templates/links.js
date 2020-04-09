import React from "react"
import { graphql } from "gatsby";

export default ({ data }) => {
  return (
    <div>
      {!(data.extendedTypes === undefined || data.extendedTypes === null) &&
        <div>
          <div className="subsubtitle">
            Extends
          </div>
          <ul>
            {data.extendedTypes.map(type => (
              <li>{type.name}</li>
            ))}
          </ul>
        </div>
      }
      {!(data.extendedBy === undefined || data.extendedBy === null) &&
        <div>
          <div className="subsubtitle">
            Extended by
          </div>
          <ul>
            {data.extendedBy.map(type => (
              <li>{type.name}</li>
            ))}
          </ul>
        </div>
      }
      {!(data.implementedTypes === undefined || data.implementedTypes === null) &&
        <div>
          <div className="subsubtitle">
            implements
          </div>
          <ul>
            {data.implementedTypes.map(type => (
              <li>{type.name}</li>
            ))}
          </ul>
        </div>
      }
      {!(data.implementedBy === undefined || data.implementedBy === null) &&
        <div>
          <div className="subsubtitle">
            implemented by
          </div>
          <ul>
            {data.implementedBy.map(type => (
              <li>{type.name}</li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
};


export const query = graphql`
query linkQuery {
  allModule(filter: {children: {elemMatch: {id: {eq : "2452"}}}}) {
    edges {
      node {
        name
        kindString
        
      }
    }
  }
}
`