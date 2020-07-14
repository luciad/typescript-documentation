import React from "react"
import { getFlags } from "../../../../../util/util"
import Icon from "../../../../general/icon"

/**
 * Flags of an item
 * Contains:
 * - List of flagIcons and flags
 */
export default ({ data }) => {
  if(!data) return null
  const flagList = getFlags(data)
  return (
    <div className="flags">
      <ul>
        {flagList.map(flag => (
          <li key={flag + "_" + data.fields.path + "_flag"} className={"flag_" + flag}>
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
