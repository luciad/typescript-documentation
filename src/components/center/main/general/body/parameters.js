import React from "react"
import { getParameters } from "../../../../../util/util"
import Text from "../text"

/**
 * Parameters of an object
 * Contains:
 * - List of parameters with their name, type, shortText and text
 */
export default ({ data, path }) => {
  const parameters = getParameters(data)
  return (
    <div>
    {parameters.length !== 0 && 
        <div className="subsubtitle">Parameters</div>}
      <ul style={{paddingLeft: "1em"}}>
        {parameters.map(parameter => (
          <li>
            <b>{parameter.name}</b>:<i>{parameter.type}</i>
            <Text data={parameter.comments.shortText} path={path}/>
            <Text data={parameter.comments.text} path={path}/>
          </li>
        ))}
      </ul>
  </div>
  );
};

// <div class="wrap-collabsible">
//               <input id={"collapsible0_" + parameter.name} className="toggle" type="checkbox"/>
//               <label for={"collapsible0_" + parameter.name} className="lbl-toggle">
//                 Short Text
//               </label>
//               <div class="collapsible-content">
//                 <div class="content-inner">
//                   <Text data={parameter.comments.shortText} path={path}/>
//                 </div>
//               </div>
//             </div>
//             <div class="wrap-collabsible">
//               <input id={"collapsible1_" + parameter.name} class="toggle" type="checkbox"/>
//               <label for={"collapsible1_" + parameter.name} class="lbl-toggle">
//                 Text
//               </label>
//               <div class="collapsible-content">
//                 <div class="content-inner">
//                   <Text data={parameter.comments.text} path={path}/>
//                 </div>
//               </div>
//             </div>