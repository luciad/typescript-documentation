import React from "react"

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
            {data.extendedTypes.map(type => (
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
            {data.extendedBy.map(type => (
              <li>{type.name}</li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
};
