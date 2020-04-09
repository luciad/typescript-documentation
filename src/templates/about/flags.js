import React from "react"
import { getFlags } from "../../util/util"
import Icon from "../icon"

export default ({ data }) => {
  const flagList = getFlags(data)  
  return (
    <div>
      <ul>
        {flagList.map(flag => (
          <li>
            <div className="sidecontainer">
            <Icon kindString="Flag"/>
              {flag}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
