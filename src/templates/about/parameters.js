import React from "react"
import { getParameters } from "../../util/util"

export default ({ data }) => {
  const parameters = getParameters(data)
  return (
    <div>
     {parameters.length !== 0 && 
          <div className="subsubtitle">parameters</div>}
        <ul style={{paddingLeft: "1em"}}>
          {parameters.map(parameter => (
            <li>
            <b>{parameter.name}</b>:<i>{parameter.type}</i>
              <div className="shortText">
                {parameter.comments.shortText}
              </div>
              <p>
              {parameter.comments.text}
              </p>
            </li>
          ))}
        </ul>
    </div>
  );
};
