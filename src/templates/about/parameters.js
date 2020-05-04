import React from "react"
import { getParameters } from "../../util/util"
import Text from "./text"

/**
 * Parameters of an object
 * Contains:
 * - List of parameters with their name, type, shortText and text
 */
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
              <Text data={parameter.comments.shortText}/>
              <Text data={parameter.comments.text}/>
            </li>
          ))}
        </ul>
    </div>
  );
};
