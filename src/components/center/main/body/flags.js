import React from "react"
import { getFlags } from "../../../../util/util"

/**
 * Flags of an item
 * Contains:
 * - List of flagIcons and flags
 */
export default ({ data }) => {
  if(!data) return null
  const flagList = getFlags(data)
  if(flagList.length === 0) return null

  return (
    <div className="flags">
      <ul>
        {flagList.map(flag => (
          <li key={flag + "_" + data.fields.path + "_flag"} className={"flag_" + flag} title="flag">
              {flag}
          </li>
        ))}
      </ul>
    </div>
  );
};
