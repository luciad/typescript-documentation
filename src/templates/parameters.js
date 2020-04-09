import React from "react"
import { getParameters, getComments } from "../util/util"

export default ({ data }) => {
  const parameters = getParameters(data)
  
  return (
    <div>
     {parameters.length !== 0 && 
          <div className="subsubtitle">parameters</div>}
        <ul style={{paddingLeft: "1em"}}>
          {parameters.map(parameter => (
            <li>{parameter.name}:{parameter.type}
              <div className="shortText">
                {getComments(parameter).shortText}
              </div>
              <p>
              {getComments(parameter).text}
              </p>
            </li>
          ))}
        </ul>
    </div>
  );
};
