import React from "react"
import { getFlags } from "../../../../../util/util"
import Icon from "../../../../general/icon"

/**
 * Flags of an item
 * Contains:
 * - List of flagIcons and flags
 */
export default ({ data }) => {
  const flagList = getFlags(data)  
  return (
    <div className="flags">
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
